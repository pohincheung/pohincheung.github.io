import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
export const collections = {
  posts: defineCollection({
    loader: glob({
      base: '.',
      pattern: ['src/content/posts/**/*.md', 'arb_in_dex.md'],
      // Keep the root writing file editable without maintaining a second copy.
      generateId: ({ entry }) => entry.replace(/^src\/content\/posts\//, '').replace(/\.md$/, ''),
    }),
    schema: z.object({
      title: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.enum(['reading', 'investing', 'quantitative', 'life']),
      tags: z.array(z.string()).default([]),
      description: z.string(),
      example: z.boolean().default(false),
    }),
  }),
};
