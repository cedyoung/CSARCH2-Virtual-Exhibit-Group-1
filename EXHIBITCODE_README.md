# The ALU Exhibit

A virtual exhibit about the Arithmetic Logic Unit, built with Astro, MDX, and React islands. The source is verified both in this Astro 6/React 19 repository and in the professor template's locked Astro 5.18/React 18.3 stack. The exhibit keeps the six proposal operations—ADD, SUB, AND, OR, XOR, and NOT—and retains SHL and SHR as advanced operations.

## Stack

| Part | Tool |
| --- | --- |
| Framework | Astro 6 locally; compatible with professor template Astro 5.18 |
| Runtime | Node.js 26.x |
| Content | MDX through the `S04_Group1_operations` content collection |
| Interactive UI | React islands compatible with React 18 and 19 |
| Arithmetic | Pure BigInt-based shared engine, tested independently from React |
| Styling | Namespaced CSS custom properties and component styles |
| Deployment | GitHub Pages from the CI-produced `dist/` artifact |

## Exhibit routes

- `/` is the professor-template museum homepage and automatically lists top-level MDX exhibits.
- `/S04_Group1/` is the Group 1 MDX exhibit entry discovered from `src/pages/S04_Group1.mdx`.
- `/S04_Group1/operations/{slug}/` renders one detail page for each of the eight operations.

Every internal link uses `import.meta.env.BASE_URL`, so routes continue to work under a repository subpath.

## Source structure

```text
src/
  content.config.ts
  content/S04_Group1_operations/
    collection.ts
    add.mdx and.mdx not.mdx or.mdx shl.mdx shr.mdx sub.mdx xor.mdx
  lib/S04_Group1_aluEngine.js
  components/
    S04_Group1_ALUSimulator.jsx
    S04_Group1_RippleCarryAdderSimulator.jsx
    S04_Group1_AdderCircuit.jsx
    S04_Group1_AluSchematic.astro
    S04_Group1_OperationCard.astro
    S04_Group1_OperationsGrid.astro
  layouts/ExhibitLayout.astro # professor-template host layout; not part of the Group 1 merge surface
  pages/
    index.mdx                # museum homepage
    S04_Group1.mdx           # top-level discoverable Group 1 entry
    S04_Group1/operations/[slug].astro
  styles/S04_Group1_global.css
tests/S04_Group1_aluEngine.test.js
```

## Professor-template merge surface

Copy only the following Group 1 paths into the professor repository:

```text
src/components/S04_Group1_*
src/content/S04_Group1_operations/
src/lib/S04_Group1_aluEngine.js
src/pages/S04_Group1.mdx
src/pages/S04_Group1/operations/[slug].astro
src/styles/S04_Group1_global.css
tests/S04_Group1_aluEngine.test.js
```

Register `S04_Group1_operations` in the shared `src/content.config.ts`; combine it with any collections already registered by other groups. Do not replace the professor's root page, layouts, global stylesheet, Astro configuration, package files, lockfile, or deployment workflow. The exhibit page uses the professor's existing `ExhibitLayout.astro`, while `S04_Group1_ExhibitShell.astro` loads and scopes all Group 1 presentation rules.

## Interactive behavior

The Mini ALU accepts nonempty binary operands up to 64 bits, preserves leading zeros, and supports Auto, 4, 8, 16, 32, and 64-bit widths. Its rendered operand bits are real buttons with accessible names and pressed states. Unary operations disable Operand B.

ADD and SUB expose Ripple Carry (RCA) and Carry Lookahead (CLA) modes. Both use the same proposal definitions:

- `G = A AND B-effective`
- `P = A OR B-effective`
- `Sum = A XOR B-effective XOR Carry-in`

RCA derives each carry recursively from its preceding carry. CLA derives every carry independently from an expanded G/P expression. The modes always return the same numerical result; their derivation and visualization differ.

SUB is implemented as `A + ~B + 1`: the interface exposes effective `~B`, sets `C0 = 1`, and treats Carry as “no borrow.” This is distinct from signed Overflow. For ADD, Carry indicates unsigned carry overflow; `V` independently indicates signed overflow.

The Ripple Carry Adder Lab also supports 64 bits, an optional carry-in, LSB-first full-adder stages, a calculation table, and replayable propagation. Its animation scales to finish within a few seconds and settles immediately when reduced motion is preferred.

## Adding an operation

Add an MDX file under `src/content/S04_Group1_operations/`. Frontmatter must provide a unique four-bit opcode, valid category, flags, ordering, and either `core` or `advanced` scope:

```mdx
---
title: Example
mnemonic: EX
opcode: '1010'
symbol: '?'
category: logic
summary: One-sentence card summary.
flagsAffected: [Z, N]
order: 9
scope: advanced
---
```

## Local development and validation

Install Node.js 26.x, then run:

```bash
npm ci
npm test
npm run check
npm run build
```

The local runtime requirement matches GitHub Actions. `SITE_URL` and `BASE_PATH` can override deployment configuration; defaults remain `https://cedyoung.github.io` and `/CSARCH2-Virtual-Exhibit-Group-1/`.

Generated dependencies, Astro caches, and `dist/` output are ignored. GitHub Pages receives a fresh build artifact from CI rather than committed output.
