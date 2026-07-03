import { useEffect, useMemo, useState } from 'react';

const OPS = [
  { id: 'ADD', label: 'ADD', symbol: '+', category: 'arithmetic' },
  { id: 'SUB', label: 'SUB', symbol: '−', category: 'arithmetic' },
  { id: 'AND', label: 'AND', symbol: '∧', category: 'logic' },
  { id: 'OR', label: 'OR', symbol: '∨', category: 'logic' },
  { id: 'XOR', label: 'XOR', symbol: '⊕', category: 'logic' },
  { id: 'NOT', label: 'NOT', symbol: '¬', category: 'logic' },
  { id: 'SHL', label: 'SHL', symbol: '≪', category: 'shift' },
  { id: 'SHR', label: 'SHR', symbol: '≫', category: 'shift' },
];

const MASK = 0b1111;

function bitsToInt(bits) {
  return bits.reduce((acc, bit) => (acc << 1) | bit, 0);
}

function intToBits(value) {
  return [3, 2, 1, 0].map((shift) => (value >> shift) & 1);
}

function toSigned4(value) {
  return value >= 8 ? value - 16 : value;
}

function compute(opId, aBits, bBits) {
  const a = bitsToInt(aBits);
  const b = bitsToInt(bBits);
  let raw = 0;
  let carry = false;
  let overflow = false;

  switch (opId) {
    case 'ADD': {
      const sum = a + b;
      raw = sum & MASK;
      carry = sum > MASK;
      const signedSum = toSigned4(a) + toSigned4(b);
      overflow = signedSum < -8 || signedSum > 7;
      break;
    }
    case 'SUB': {
      const diff = a - b;
      raw = diff & MASK;
      carry = a >= b; // no-borrow convention
      const signedDiff = toSigned4(a) - toSigned4(b);
      overflow = signedDiff < -8 || signedDiff > 7;
      break;
    }
    case 'AND':
      raw = a & b;
      break;
    case 'OR':
      raw = a | b;
      break;
    case 'XOR':
      raw = a ^ b;
      break;
    case 'NOT':
      raw = ~a & MASK;
      break;
    case 'SHL':
      raw = (a << 1) & MASK;
      carry = (a & 0b1000) !== 0;
      break;
    case 'SHR':
      raw = a >> 1;
      carry = (a & 0b0001) !== 0;
      break;
    default:
      raw = 0;
  }

  return {
    resultBits: intToBits(raw),
    flags: {
      Z: raw === 0,
      C: carry,
      N: (raw & 0b1000) !== 0,
      V: overflow,
    },
  };
}

function BitSwitch({ bit, index, disabled, onToggle, groupLabel }) {
  return (
    <button
      type="button"
      className="alu-sim__bit"
      data-on={bit === 1}
      disabled={disabled}
      aria-pressed={bit === 1}
      aria-label={`${groupLabel} bit ${index}, currently ${bit}`}
      onClick={onToggle}
    >
      {bit}
    </button>
  );
}

function BitRow({ label, bits, disabled, onToggleBit }) {
  return (
    <div className="alu-sim__row">
      <span className="alu-sim__row-label">{label}</span>
      <div className="alu-sim__bits" role="group" aria-label={`${label} input bits`}>
        {bits.map((bit, i) => (
          <BitSwitch
            key={i}
            bit={bit}
            index={3 - i}
            disabled={disabled}
            groupLabel={label}
            onToggle={() => onToggleBit(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ALUSimulator() {
  const [aBits, setABits] = useState([0, 1, 0, 1]);
  const [bBits, setBBits] = useState([0, 0, 1, 1]);
  const [opId, setOpId] = useState('ADD');
  const [pulse, setPulse] = useState(false);

  const op = OPS.find((o) => o.id === opId) ?? OPS[0];
  const bDisabled = opId === 'NOT';

  const { resultBits, flags } = useMemo(() => compute(opId, aBits, bBits), [opId, aBits, bBits]);

  // Every recompute sends a short glow down the trace between the
  // switches and the readout — a small, deliberate flourish rather
  // than a constantly-looping animation.
  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 500);
    return () => clearTimeout(t);
  }, [opId, aBits, bBits]);

  const toggleBit = (setter) => (index) => {
    setter((prev) => prev.map((b, i) => (i === index ? (b ? 0 : 1) : b)));
  };

  const aValue = bitsToInt(aBits);
  const bValue = bitsToInt(bBits);
  const resultValue = bitsToInt(resultBits);

  return (
    <div className="alu-sim">
      <div className="alu-sim__panel">
        <div className="alu-sim__operands">
          <BitRow label="A" bits={aBits} disabled={false} onToggleBit={toggleBit(setABits)} />
          <div className="alu-sim__decimal mono-value">= {aValue}</div>

          <BitRow label="B" bits={bBits} disabled={bDisabled} onToggleBit={toggleBit(setBBits)} />
          <div className="alu-sim__decimal mono-value">{bDisabled ? '— unused for NOT' : `= ${bValue}`}</div>
        </div>

        <div className="alu-sim__opcodes" role="group" aria-label="Select ALU operation">
          {OPS.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              className="alu-sim__opbtn"
              data-active={candidate.id === opId}
              data-category={candidate.category}
              aria-pressed={candidate.id === opId}
              onClick={() => setOpId(candidate.id)}
            >
              {candidate.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`alu-sim__trace ${pulse ? 'is-active' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 40 120" preserveAspectRatio="none">
          <path d="M 20 0 V 120" />
        </svg>
      </div>

      <div className="alu-sim__core">
        <span className="alu-sim__core-op mono-value">{op.symbol}</span>
        <span className="eyebrow">{op.label}</span>
      </div>

      <div className={`alu-sim__trace ${pulse ? 'is-active' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 40 120" preserveAspectRatio="none">
          <path d="M 20 0 V 120" />
        </svg>
      </div>

      <div className="alu-sim__readout">
        <div className="alu-sim__result">
          <span className="alu-sim__row-label">RESULT</span>
          <div className="alu-sim__bits alu-sim__bits--result">
            {resultBits.map((bit, i) => (
              <span key={i} className="alu-sim__bit alu-sim__bit--readonly" data-on={bit === 1}>
                {bit}
              </span>
            ))}
          </div>
          <div className="alu-sim__decimal mono-value">= {resultValue}</div>
        </div>

        <div className="alu-sim__flags" role="group" aria-label="Status flags">
          {Object.entries(flags).map(([name, active]) => (
            <div key={name} className="alu-sim__flag">
              <span className="alu-sim__led" data-on={active} />
              <span className="alu-sim__flag-label mono-value">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .alu-sim {
          display: grid;
          grid-template-columns: 1fr auto auto auto 1fr;
          align-items: center;
          gap: 0.75rem;
          padding: 1.5rem;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow-x: auto;
        }
        .alu-sim__panel {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }
        .alu-sim__row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .alu-sim__row-label {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--paper-dim);
          width: 1.4em;
        }
        .alu-sim__bits {
          display: flex;
          gap: 0.35rem;
        }
        .alu-sim__bits--result {
          gap: 0.35rem;
        }
        .alu-sim__bit {
          width: 2.1rem;
          height: 2.1rem;
          border-radius: var(--radius);
          border: 1px solid var(--border-strong);
          background: var(--bg);
          color: var(--paper-dim);
          font-family: var(--font-mono);
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease;
        }
        .alu-sim__bit:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .alu-sim__bit[data-on='true'] {
          background: var(--trace-dim);
          border-color: var(--trace);
          color: var(--trace);
        }
        .alu-sim__bit--readonly {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: default;
        }
        .alu-sim__decimal {
          font-size: 0.78rem;
          color: var(--paper-dim);
          margin-left: 2.15rem;
        }
        .alu-sim__opcodes {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.4rem;
        }
        .alu-sim__opbtn {
          padding: 0.45rem 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          background: var(--bg);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius);
          color: var(--paper-dim);
          cursor: pointer;
        }
        .alu-sim__opbtn[data-active='true'] {
          background: var(--trace-dim);
          border-color: var(--trace);
          color: var(--trace);
        }
        .alu-sim__trace {
          width: 24px;
          height: 100%;
          min-height: 140px;
        }
        .alu-sim__trace svg {
          width: 100%;
          height: 100%;
        }
        .alu-sim__trace path {
          fill: none;
          stroke: var(--border-strong);
          stroke-width: 2;
          transition: stroke 0.3s ease;
        }
        .alu-sim__trace.is-active path {
          stroke: var(--trace);
        }
        .alu-sim__core {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          padding: 1.25rem 1rem;
          border: 1px solid var(--border-strong);
          border-radius: var(--radius);
          background: var(--panel-raised);
        }
        .alu-sim__core-op {
          font-size: 1.8rem;
          color: var(--trace);
        }
        .alu-sim__readout {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .alu-sim__flags {
          display: flex;
          gap: 1rem;
        }
        .alu-sim__flag {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .alu-sim__led {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          background: var(--border-strong);
          display: inline-block;
        }
        .alu-sim__led[data-on='true'] {
          background: var(--carry);
          box-shadow: 0 0 6px var(--carry);
        }
        .alu-sim__flag-label {
          font-size: 0.78rem;
          color: var(--paper-dim);
        }

        @media (max-width: 860px) {
          .alu-sim {
            grid-template-columns: 1fr;
          }
          .alu-sim__trace {
            width: 100%;
            height: 24px;
            transform: rotate(90deg);
            min-height: unset;
          }
        }
      `}</style>
    </div>
  );
}
