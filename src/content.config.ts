import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    image: z.string().optional(),        // social-preview image only (set by the Blogger import)
    labels: z.array(z.string()).default([]),
    blogger_id: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
