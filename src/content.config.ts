import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const operations = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/operations' }),
  schema: ({ image }) =>
    z.object({
      // Full name, e.g. "Addition"
      title: z.string(),
      // Short mnemonic shown on the case badge, e.g. "ADD"
      mnemonic: z.string(),
      // 4-bit opcode line the control unit would send to the ALU, e.g. "0000"
      opcode: z.string().regex(/^[01]{4}$/, 'opcode must be a 4-bit binary string'),
      // Operator glyph used in the schematic, e.g. "+"
      symbol: z.string(),
      category: z.enum(['arithmetic', 'logic', 'shift']),
      // One-line summary used on the index card
      summary: z.string(),
      // Status flags this operation can set
      flagsAffected: z.array(z.enum(['Z', 'C', 'N', 'V'])),
      // Datasheet-style diagram, e.g. a gate-level PNG
      diagram: image().optional(),
      // Display order within its category
      order: z.number().default(0),
    }),
});

export const collections = { operations };
