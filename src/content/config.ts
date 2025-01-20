import { defineCollection, z } from "astro:content"
import { glob } from 'astro/loaders'

const creativeblog = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/creative-developer/blog" }),
    schema: ({ image }) => z.object({
        Name: z.string(),
        Title: z.string(),
        Date: z.string(),
        Description: z.string(),
        LiveDemo: z.string(),
        SourceCode: z.string(),
        Hashtag: z.array(z.string()),
        Tool: z.string(),
        VideoFallback: z.string(),
        VideoShow: z.string(),
    })
});

export const collections = { creativeblog };