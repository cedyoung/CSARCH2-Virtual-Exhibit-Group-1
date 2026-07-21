# CSARCH2 Virtual Exhibit — Group 1

## Incremental Development Documentation

**Exhibit:** *Inside the ALU: How Computers Perform Arithmetic and Logic Operations*<br>
**Documentation update:** July 19, 2026

This is the newest project document. It records the work completed after the original proposal, the team's development reflections, and the tasks that remain before the final submission. The previous proposal and exhibit description are preserved below this section so that the README shows the project's progress incrementally.

### Current development status

The Group 1 exhibit is feature-complete as an interactive Astro site. It builds as a static website and includes the proposed ALU lessons, two interactive simulators, eight operation pages, responsive styling, automated arithmetic tests, and a GitHub Pages deployment workflow. The remaining work is primarily final integration, deployment verification, content review, accessibility and browser testing, and submission preparation.

### Things done

#### 1. Converted the proposal into an exhibit narrative

- Organized the lesson from binary representation to the role of the ALU, arithmetic and logic operations, flags, adder circuits, and historical context.
- Kept the six proposal operations clearly identifiable: ADD, SUB, AND, OR, XOR, and NOT.
- Retained SHL and SHR as optional advanced operations without taking attention away from the six core operations.
- Added an individual MDX detail page for every operation so visitors can move from the overview into deeper explanations.

#### 2. Built the interactive Mini ALU

- Added editable binary operands with input validation and clickable bit controls.
- Supported Auto, 4, 8, 16, 32, and 64-bit word widths while preserving meaningful leading zeros.
- Displayed binary, decimal, and hexadecimal results together with Zero, Carry, Negative, and Overflow flags.
- Implemented ADD, SUB, AND, OR, XOR, NOT, SHL, and SHR using a shared BigInt-based arithmetic engine.
- Made unary behavior explicit by disabling Operand B when it is not used.

#### 3. Visualized ripple-carry and carry-lookahead addition

- Implemented Ripple Carry Adder (RCA) and Carry Lookahead Adder (CLA) modes for ADD and SUB.
- Exposed effective B, initial carry, Generate, Propagate, sum, carry-in, carry-out, and the formula used at every bit.
- Added a separate Ripple Carry Adder Lab with an optional carry-in, LSB-first stage display, decimal verification, and replayable carry animation.
- Preserved the proposal's definitions: `G = A AND B-effective`, `P = A OR B-effective`, and `Sum = A XOR B-effective XOR Carry-in`.

#### 4. Developed the visual and interactive presentation

- Created a dark technical/museum visual direction inspired by circuit traces, schematics, status lights, and engineering workbenches.
- Added an ALU schematic, operation cards, flag indicators, carry tables, and side-by-side circuit explanations.
- Used progressive disclosure: visitors first encounter the concept, then try the simulator, and finally inspect the underlying bit-level circuit behavior.
- Added responsive layouts, keyboard-operable bit buttons, accessible labels, live result regions, and reduced-motion handling.

#### 5. Prepared the exhibit for integration

- Namespaced Group 1 components, styles, content, routes, and tests with `S04_Group1` to reduce conflicts with other groups.
- Separated the pure arithmetic engine from React presentation components so calculations can be tested without rendering the interface.
- Used an Astro content collection for operation metadata and MDX lessons instead of hardcoding every operation card.
- Used `import.meta.env.BASE_URL` for internal routes so the exhibit works under the GitHub Pages repository subpath.
- Documented the exact Group 1 files that should be copied into the professor's shared exhibit and the shared files that must be merged rather than overwritten.

#### 6. Added validation and deployment support

- Added exhaustive RCA-versus-CLA comparison tests for ADD and SUB at widths 1 through 8.
- Added test cases for 64-bit operations, invalid input, leading zeros, carry, signed overflow, subtraction borrow, and flag behavior.
- Confirmed that the production build generates the museum homepage, the Group 1 exhibit, and all eight operation pages.
- Added a GitHub Pages workflow that installs dependencies, builds Astro, uploads `dist`, and deploys the Pages artifact.
- Temporarily allowed deployments from `matthewandrecorral-patch-1` so the feature branch can be tested before final integration.

### Aha moments

#### The same answer can hide a different circuit path

RCA and CLA return the same numerical result, but they arrive there differently. RCA waits for each carry to move through the preceding stage, while CLA expands the carry expressions from Generate, Propagate, and the initial carry. Showing both the result and the derivation made the performance difference understandable instead of presenting it as a definition to memorize.

#### Leading zeros are part of the lesson

For ordinary numerical input, `0001` and `1` are equal. In a hardware exhibit, however, they can represent different word widths. Preserving leading zeros allowed the simulator to teach padding, masking, sign bits, and fixed-width behavior more accurately.

#### Carry and overflow must not be treated as the same flag

Unsigned Carry and signed Overflow describe different conditions. Subtraction adds another subtlety: Carry indicates *no borrow*. Separating these meanings in the engine, interface, explanations, and tests prevented several misleading edge cases.

#### The proposal's Propagate definition matters

Adder references sometimes use XOR for Propagate, but the proposal specifies OR. Implementing and testing `P = A OR B-effective` showed that the carry recurrence remains correct while the sum still requires XOR. This became an explicit tested design decision rather than an accidental implementation detail.

#### Deployment paths are part of application design

A site that works at `/` can still lose its scripts, styles, or links when published at `/CSARCH2-Virtual-Exhibit-Group-1/`. Treating the base path as a shared configuration value - and using it in every internal route - made the generated site portable to GitHub Pages.

### Things learned

- A pure calculation module makes complex interactive UI easier to test and debug.
- BigInt is safer than JavaScript Number for exact 64-bit bitwise arithmetic.
- Astro can deliver the lesson as static HTML while React islands hydrate only the interactive simulators.
- Content collections and MDX make repeated educational content easier to validate, order, and expand.
- Accessibility is easier to maintain when it is included in the component design: real buttons, pressed states, clear labels, keyboard support, live regions, and motion preferences were added as features rather than patches.
- Namespacing and a documented merge surface are essential when several groups contribute to one shared site.
- A successful local build is not enough; repository ownership, Pages settings, runtime versions, action versions, environment permissions, and the published base URL must also agree.

### Challenges and how they were addressed

| Challenge | Development response |
| --- | --- |
| Making RCA and CLA educational rather than two identical calculator modes | Displayed their individual carry derivations and verified that both architectures always agree on results and flags. |
| Handling fixed-width arithmetic through 64 bits | Used BigInt, explicit masks, preserved input width, and tested all eight operations at 64 bits. |
| Explaining subtraction without hiding two's complement | Exposed `~B`, `C0 = 1`, the effective adder input, borrow state, and the distinction between Carry and Overflow. |
| Keeping a large simulator understandable on small screens | Grouped controls and outputs, used scrollable trace tables, and separated quick results from deeper circuit traces. |
| Integrating into a shared class repository | Namespaced Group 1 files and documented which shared files must be merged rather than replaced. |
| Publishing below a GitHub repository path | Configured Astro's `site` and `base`, then generated all internal links from the base URL. |
| Preventing visual changes from breaking arithmetic | Moved calculations into a shared pure engine and added automated regression tests independent of React. |
| Iterating on GitHub Pages deployment | Added a two-job build/deploy workflow, Pages permissions, artifact upload, concurrency control, and a temporary feature-branch trigger. |

### Creative development decisions

- Presented the exhibit as a guided engineering workbench rather than a conventional calculator page.
- Made the simulator's internal state visible so interaction produces an explanation, not only an answer.
- Used a second focused RCA lab to let visitors slow down and replay carry propagation after seeing it in the unified ALU.
- Combined operation cards with content-driven detail routes, allowing short browsing and deeper study in the same exhibit.
- Used circuit-inspired color, typography, diagrams, LEDs, trace lines, and tabular bit data to connect the interface visually with the hardware topic.
- Added advanced shift operations as an optional extension while labeling the original proposal operations as the core learning scope.

### To be done for the final submission

The following items should be completed and checked off before submission:

- [ ] **Resolve the Node.js version mismatch.** The workflow currently builds with Node 24, while `package.json` and the older documentation declare Node 26. Select one supported version and use it consistently in the workflow, package metadata, README, and team setup.
- [ ] **Confirm the final repository and Pages URL.** GitHub reports that the repository moved from `cedyoung` to `CSARCH2-GROUP1`. Verify the final Pages address, then update `site` in `astro.config.mjs` and any README URLs if the organization URL is used.
- [ ] **Verify a successful GitHub Pages deployment.** Confirm green build and deploy jobs, open the public URL in a signed-out browser, and test every route, script, stylesheet, and interactive island.
- [ ] **Return production deployment to the final branch policy.** After branch testing, decide whether the temporary `matthewandrecorral-patch-1` trigger should be removed so only `main` can update the final site.
- [ ] **Merge into the professor's final exhibit repository.** Copy only the documented Group 1 merge surface, combine the content collection registration, and confirm that no other group's files or shared layout are overwritten.
- [ ] **Run validation from a clean installation.** Run `npm ci`, `npm test`, `npm run check`, and `npm run build`; record or screenshot the passing results for submission evidence.
- [ ] **Complete cross-browser and responsive testing.** Check current Chrome, Edge, and Firefox builds plus phone, tablet, and desktop widths, especially 32/64-bit controls and horizontally scrollable traces.
- [ ] **Complete an accessibility pass.** Test keyboard-only use, visible focus, screen-reader labels and announcements, contrast, semantic heading order, and reduced-motion behavior.
- [ ] **Proofread and academically verify the content.** Recheck terminology, truth tables, equations, flag explanations, operation examples, names, reading time, grammar, and consistency with the approved proposal.
- [ ] **Add and verify references.** Provide citations or a bibliography for technical and historical claims, diagrams, and any third-party visual material required by the course.
- [ ] **Refresh final documentation evidence.** Replace outdated screenshots if the UI changes and add the confirmed live exhibit link, final repository link, deployment result, and any required contribution record.
- [ ] **Prepare the final demonstration.** Agree on the presentation sequence, sample inputs, edge cases, speaker assignments, and a backup recording or local build in case the network is unavailable.

---

## Previous Proposal and Exhibit Document

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

## Snapshot of Layout Design:
<img width="1917" height="726" alt="image" src="https://github.com/user-attachments/assets/e0e14c45-4b94-47c8-af5d-bccecf8cd9b6" />
<img width="1917" height="651" alt="image" src="https://github.com/user-attachments/assets/cd3107d8-32b7-4d63-a9e0-f1a2df854717" />
<img width="1917" height="722" alt="image" src="https://github.com/user-attachments/assets/17e2f232-39a5-4c71-886a-a294b14877ff" />
<img width="1917" height="762" alt="image" src="https://github.com/user-attachments/assets/22118a75-b0da-4735-85c0-5d567328db08" />
<img width="1917" height="742" alt="image" src="https://github.com/user-attachments/assets/4bfe8a72-cce7-40a8-89dd-a1a247052cdc" />
<img width="1917" height="682" alt="image" src="https://github.com/user-attachments/assets/a4d023cb-397b-43fb-9342-1556ec1c1987" />
<img width="1917" height="161" alt="image" src="https://github.com/user-attachments/assets/025f3011-a2d9-49af-b956-d602c0cf99b5" />
<img width="1911" height="752" alt="image" src="https://github.com/user-attachments/assets/23baf5c1-69d0-4802-bacc-c741a4fce63d" />
<img width="1917" height="267" alt="image" src="https://github.com/user-attachments/assets/f8aaedeb-f6d8-47c3-89eb-be4cd01a3761" />
<img width="1917" height="747" alt="image" src="https://github.com/user-attachments/assets/a9731648-8b5e-4763-9bda-def2a2d92ecf" />

## Disclosure on the Use of AI/LLM

Artificial Intelligence (AI) tools being used in the making of this project are **ChatGPT**, **Google Gemini** and **ClaudeAI**. The role of these AI tools in this project is they assist the members in productivity and act as a tool for learning and clarifying concepts. 

AI Tools are used for the following purposes: 
- Clarifying the concepts of Astro, MDX and React JSX and how to apply them properly in the project. 
- Explaining the ideas related to the concept of the Arithmetic Logic Unit. 
- Clarify how can Astro, MDX and React JSX can interact with one another in the code. 

All AI-generated suggestions were analyzed and reviewed prior to its utilization in the project. The project's final implementation, processes, design, deliverables and debugging were all taken care of and integrated by the members of this group. 

Link to Figma: https://www.figma.com/make/GDR34ZTPlb8ET8viaV19dM/Mini-ALU-Simulator?t=o8ehtl5ZBDA8LAcR-1
