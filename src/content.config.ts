import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
export const collections = {
  posts: defineCollection({
    loader: glob({
      base: './content',
      pattern: '{reading,investing,quantitative,life}/**/*.md',
      // Category folders organize source files without changing published post URLs.
      generateId: ({ entry }) => entry.replace(/^[^/]+\//, '').replace(/\.md$/, ''),
    }),
    schema: z.object({
      title: z.string(),
      authors: z.array(z.string()).default(['PohinCheung']),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.enum(['reading', 'investing', 'quantitative', 'life']),
      tags: z.array(z.string()).default([]),
      description: z.string(),
      example: z.boolean().default(false),
    }),
  }),
};
