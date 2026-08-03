import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Články blogu — generuje `plan/scripty/clanky_do_astro.py` z WP exportu.
 * Súbory sa needitujú ručne: prepíše ich ďalší beh skriptu.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    /** H1 článku — pôvodný nadpis z WP, verbatim */
    title: z.string(),
    /** <title> v hlavičke — bez prívesku, max 60 znakov */
    titulSeo: z.string(),
    popis: z.string(),
    datum: z.date(),
    kategorie: z.array(z.string()),
    obrazok: z.string().nullable().default(null),
    zdroj: z.string(),
    /** 0 slov vo WP — stránka existuje, ale obsah čaká na Mateja */
    prazdny: z.boolean().default(false),
  }),
});

export const collections = { blog };
