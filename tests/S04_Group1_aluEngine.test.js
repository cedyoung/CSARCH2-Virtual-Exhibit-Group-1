import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeAdderTrace,
  computeALU,
  deriveLookaheadCarries,
  deriveRippleCarries,
  validateBinary,
} from '../src/lib/S04_Group1_aluEngine.js';

for (const operation of ['ADD', 'SUB']) {
  test(`${operation}: RCA and CLA agree exhaustively at widths 1-8`, () => {
    for (let width = 1; width <= 8; width += 1) {
      const limit = 1 << width;
      for (let a = 0; a < limit; a += 1) {
        for (let b = 0; b < limit; b += 1) {
          const input = {
            operation,
            aInput: a.toString(2).padStart(width, '0'),
            bInput: b.toString(2).padStart(width, '0'),
            width,
          };
          const rca = computeALU({ ...input, mode: 'RCA' });
          const cla = computeALU({ ...input, mode: 'CLA' });
          assert.equal(rca.resultBinary, cla.resultBinary);
          assert.deepEqual(rca.trace.rippleCarries, rca.trace.lookaheadCarries);
          assert.deepEqual(rca.flags, cla.flags);
        }
      }
    }
  });
}

test('carry and sum identities use proposal G=AND and P=OR', () => {
  const trace = computeAdderTrace('10110101', '01101110', 1, 'CLA');
  trace.stages.forEach((stage) => {
    assert.equal(stage.generate, stage.aBit & stage.bBit);
    assert.equal(stage.propagate, stage.aBit | stage.bBit);
    assert.equal(stage.carryOut, stage.generate | (stage.propagate & stage.carryIn));
    assert.equal(stage.sumBit, stage.aBit ^ stage.bBit ^ stage.carryIn);
  });
  assert.deepEqual(
    deriveRippleCarries(trace.generate, trace.propagate, 1),
    deriveLookaheadCarries(trace.generate, trace.propagate, 1),
  );
});

test('documented edge cases and flag meanings', () => {
  const carry = computeALU({ operation: 'ADD', aInput: '1111', bInput: '0001', width: 4 });
  assert.equal(carry.resultBinary, '0000');
  assert.equal(carry.flags.C, true);
  assert.equal(carry.flags.V, false);

  const signedOverflow = computeALU({ operation: 'ADD', aInput: '0111', bInput: '0001', width: 4 });
  assert.equal(signedOverflow.resultBinary, '1000');
  assert.equal(signedOverflow.flags.C, false);
  assert.equal(signedOverflow.flags.V, true);

  const borrow = computeALU({ operation: 'SUB', aInput: '0011', bInput: '0101', width: 4 });
  assert.equal(borrow.resultBinary, '1110');
  assert.equal(borrow.effectiveB, '1010');
  assert.equal(borrow.initialCarry, 1);
  assert.equal(borrow.borrow, true);
  assert.equal(borrow.flags.C, false);

  const equal = computeALU({ operation: 'SUB', aInput: '0101', bInput: '0101', width: 4 });
  assert.equal(equal.resultBinary, '0000');
  assert.equal(equal.flags.C, true);
  assert.equal(equal.flags.Z, true);
});

test('all operations match BigInt references at 64 bits', () => {
  const a = '1111000011110000111100001111000011110000111100001111000011110000';
  const b = '0000111100001111000011110000111100001111000011110000111100001111';
  const av = BigInt(`0b${a}`);
  const bv = BigInt(`0b${b}`);
  const mask = (1n << 64n) - 1n;
  const refs = {
    ADD: (av + bv) & mask,
    SUB: (av - bv) & mask,
    AND: av & bv,
    OR: av | bv,
    XOR: av ^ bv,
    NOT: (~av) & mask,
    SHL: (av << 1n) & mask,
    SHR: av >> 1n,
  };
  Object.entries(refs).forEach(([operation, expected]) => {
    const actual = computeALU({ operation, aInput: a, bInput: b, width: 64 });
    assert.equal(actual.resultValue, expected, operation);
  });
});

test('validation preserves leading zero width and rejects empty, invalid, and 65-bit inputs', () => {
  assert.equal(validateBinary('0001'), '');
  assert.match(validateBinary(''), /required/);
  assert.match(validateBinary('10x1'), /only 0 and 1/);
  assert.match(validateBinary('1'.repeat(65)), /64 bits or fewer/);
  const leading = computeALU({ operation: 'ADD', aInput: '0001', bInput: '0001', width: 'auto' });
  assert.equal(leading.width, 4);
  assert.equal(leading.resultBinary, '0010');
  const unary = computeALU({ operation: 'NOT', aInput: '0101', bInput: '1'.repeat(64), width: 'auto' });
  assert.equal(unary.width, 4);
  assert.equal(unary.resultBinary, '1010');
});
