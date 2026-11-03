import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
export const collections = { posts: defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/posts'}),schema:z.object({title:z.string(),date:z.coerce.date(),category:z.enum(['reading','investing','life']),tags:z.array(z.string()).default([]),description:z.string(),example:z.boolean().default(false)})}) };