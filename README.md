# CSARCH2 Virtual Exhibit — Group 1

## Inside the ALU: How Computers Perform Arithmetic and Logic Operations

### Members

- Corral, Matthew
- De Castro, Jediaelle Denise
- Del Mundo, Joshua
- Fabricante, Jeruel
- Young, Cedric

## Topic theme

The exhibit explains that computers perform arithmetic and logic through physical binary circuits. It moves from binary representation to ALU inputs, operations, status flags, two's-complement subtraction, and the carry circuits that make addition possible.

The six proposal operations remain clearly identifiable: ADD, SUB, AND, OR, XOR, and NOT. The completed exhibit also retains SHL and SHR as advanced operations, giving all eight Mini ALU selections their own conceptual card and detail route.

## Tech stack plan

| Part | Implementation |
| --- | --- |
| Main framework | Astro static site; tested on Astro 6 and template Astro 5.18 |
| Runtime | Node.js 26.x |
| Content | MDX and an Astro content collection |
| Interactive components | React JSX islands compatible with React 18 and 19 |
| Arithmetic | Shared pure JavaScript engine using BigInt |
| Styling | Dark technical design with namespaced responsive CSS |
| Repository and deployment | GitHub with GitHub Pages CI |

## Interactive element

The unified Mini ALU accepts binary Operand A and Operand B values up to 64 bits. Visitors can type values or toggle each visible bit with the keyboard or pointer, choose Auto/4/8/16/32/64-bit width, and run ADD, SUB, AND, OR, XOR, NOT, SHL, or SHR. Decimal, hexadecimal, binary result, and Z/C/N/V flags update live. Unary operations clearly disable Operand B.

For ADD and SUB, visitors select either Ripple Carry Adder (RCA) or Carry Lookahead Adder (CLA). The simulator exposes effective B, `C0`, bit positions, Generate, Propagate, carry-in/out, sum bits, and the derivation used by the selected architecture. The proposal definitions are preserved: `G = A AND B-effective` and `P = A OR B-effective`; sum uses XOR.

RCA computes `Ci+1 = Gi OR (Pi AND Ci)` stage by stage. CLA expands each carry directly from G/P and `C0`, independently of the ripple chain. Both architectures therefore produce identical numbers while illustrating different circuit timing and complexity.

The separate Ripple Carry Adder Lab accepts up to 64 bits and an optional carry-in. It shows the full result, decimal check, LSB-first stage chain, calculation table, and a replayable animation that respects reduced-motion settings.

## Simulator flow

1. Enter nonempty binary operands, preserving any meaningful leading zeros.
2. Choose Auto or a fixed word width up to 64 bits.
3. Select one of eight ALU operations.
4. For ADD/SUB, compare RCA and CLA carry derivations.
5. Inspect effective B, per-bit G/P/carry/sum values, masked result, full carry, number formats, flags, and warnings.

## Reading the flags correctly

- `Z` is set when the masked result is zero.
- `N` mirrors the selected word's most-significant result bit.
- For ADD, `C` reports unsigned carry overflow; `V` separately reports signed overflow.
- For SUB, `C` means no borrow. A set SUB Carry is not an overflow warning; `V` still reports signed overflow independently.

## Development and deployment

Use Node.js 26.x, matching the repository declaration and GitHub Actions:

```bash
npm ci
npm test
npm run check
npm run build
```

The museum root automatically lists the top-level `src/pages/S04_Group1.mdx` entry at `/S04_Group1/`. Operation details live at `/S04_Group1/operations/{slug}/`. The Group 1 page uses the professor's shared exhibit layout and loads its own namespaced shell and stylesheet. `SITE_URL` and `BASE_PATH` may override the GitHub Pages defaults. CI publishes a fresh `dist/` artifact, while `node_modules/`, `.astro/`, and `dist/` remain ignored.

For the professor-template merge, copy only `S04_Group1_*` components, the Group 1 content directory, arithmetic engine, top-level exhibit page, nested operation route, group stylesheet, and tests. Merge the `S04_Group1_operations` collection registration with other groups; do not overwrite the professor's root page, layouts, global stylesheet, package files, Astro configuration, lockfile, or deployment workflow.

## Snapshot of layout design

<img width="1917" height="726" alt="ALU exhibit hero" src="https://github.com/user-attachments/assets/e0e14c45-4b94-47c8-af5d-bccecf8cd9b6" />
<img width="1917" height="651" alt="ALU exhibit overview" src="https://github.com/user-attachments/assets/cd3107d8-32b7-4d63-a9e0-f1a2df854717" />
<img width="1917" height="722" alt="Binary basics section" src="https://github.com/user-attachments/assets/17e2f232-39a5-4c71-886a-a294b14877ff" />
<img width="1917" height="762" alt="ALU operation cards" src="https://github.com/user-attachments/assets/22118a75-b0da-4735-85c0-5d567328db08" />
<img width="1917" height="742" alt="Mini ALU simulator" src="https://github.com/user-attachments/assets/4bfe8a72-cce7-40a8-89dd-a1a247052cdc" />
<img width="1917" height="682" alt="Adder comparison" src="https://github.com/user-attachments/assets/a4d023cb-397b-43fb-9342-1556ec1c1987" />
<img width="1917" height="161" alt="Exhibit divider" src="https://github.com/user-attachments/assets/025f3011-a2d9-49af-b956-d602c0cf99b5" />
<img width="1911" height="752" alt="ALU history" src="https://github.com/user-attachments/assets/23baf5c1-69d0-4802-bacc-c741a4fce63d" />
<img width="1917" height="267" alt="Tech stack section" src="https://github.com/user-attachments/assets/f8aaedeb-f6d8-47c3-89eb-be4cd01a3761" />
<img width="1917" height="747" alt="Exhibit footer" src="https://github.com/user-attachments/assets/a9731648-8b5e-4763-9bda-def2a2d92ecf" />

[Figma design](https://www.figma.com/make/GDR34ZTPlb8ET8viaV19dM/Mini-ALU-Simulator?t=o8ehtl5ZBDA8LAcR-1)
