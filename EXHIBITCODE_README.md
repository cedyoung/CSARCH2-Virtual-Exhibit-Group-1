# The ALU Exhibit

A virtual exhibit on the Arithmetic Logic Unit, built with Astro 6, MDX, and a React island.

## Stack

| Part        | Tool                                   |
| ----------- | --------------------------------------- |
| Framework   | Astro 6 (static output)                 |
| Runtime     | Node.js ≥ 26                            |
| Content     | MDX via `astro:content` collections     |
| Interactive | React (one island: `ALUSimulator.jsx`)  |
| Styling     | CSS custom properties + Astro scoped `<style>` |
| Assets      | PNG diagrams via `astro:assets`         |

## Structure

```
src/
  content.config.ts          # zod schema for the "operations" collection
  content/operations/*.mdx   # one file per ALU operation (ADD, SUB, AND, XOR, SHL...)
  components/
    AluSchematic.astro       # static hero block diagram (SVG)
    OperationCard.astro      # datasheet card for the index grid
    ALUSimulator.jsx         # the interactive 4-bit ALU (React island)
  layouts/BaseLayout.astro   # shared head/header/footer
  pages/
    index.astro              # hero, anatomy, operations grid, simulator, timeline
    operations/[slug].astro  # per-operation detail page, renders the MDX body
  styles/global.css          # design tokens, reset, typography
```

## Adding an operation

Drop a new `.mdx` file into `src/content/operations/`, e.g. `or.mdx`:

```mdx
---
title: Bitwise OR
mnemonic: OR
opcode: '0101'
symbol: '∨'
category: logic
summary: One-sentence summary for the index card.
flagsAffected: [Z, N]
order: 6
diagram: ./or-gates.png   # optional — see below
---

Body content in MDX/Markdown. Tables render with the exhibit's datasheet styling automatically.
```

It will automatically appear in the operations grid on the home page and get its own
`/operations/or/` page — no other file needs to change.

## Adding PNG diagrams

The `diagram` field is optional. To use it, put a PNG next to the MDX file (or anywhere under
`src/`) and reference it with a relative path, e.g. `diagram: ./or-gates.png`. Astro's
`image()` schema helper validates and optimizes it automatically; nothing else to configure.

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
```

## Merging into an existing repo

If you already have an Astro project, the pieces you need are:

1. `src/content.config.ts` and `src/content/operations/` — the collection and its entries.
2. `src/components/`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`.
3. `src/pages/index.astro` and `src/pages/operations/[slug].astro`.
4. Add `@astrojs/react` and `@astrojs/mdx` to your `astro.config.mjs` integrations if they
   aren't already there, and merge the dependency versions from `package.json`.

Everything is namespaced under its own class prefixes (`alu-sim__…`, `card__…`, `op__…`), so it
shouldn't collide with existing styles.
