import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
  slug: (e) => {
    console.log(e);
    return e.defaultSlug.replace(/^\d+/, '');
  },
});

const comics = defineCollection({
  schema: z.object({
    title: z.string(),
    alt: z.string().optional(),
  }),
});

export const collections = { blog, comics };
