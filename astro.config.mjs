// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkLinkCard from "remark-link-card";
import remarkCodeGithub from "remark-code-github";

// https://astro.build/config
export default defineConfig({
  site: "https://fossamagna.github.io",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [
      [
        remarkLinkCard,
        {
          cache: false,
          shortenUrl: false,
        },
      ],
      [remarkCodeGithub, {}],
    ],
  },
});
