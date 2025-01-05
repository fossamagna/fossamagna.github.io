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
      remarkCodeGithub,
    ],
  },
  redirects: {
    "/": "/blog",
    "/allow-3rd-party-plugin-to-amplify-override":
      "/blog/allow-3rd-party-plugin-to-amplify-override",
    "/anatomy-of-amplify-override": "/blog/anatomy-of-amplify-override",
    "/aws-summit-online-2022": "/blog/aws-summit-online-2022",
    "/deploy-to-amplify-console": "/blog/deploy-to-amplify-console",
    "/html5j-webplat-201610": "/blog/html5j-webplat-201610",
    "/introduce-amplify-backend-vscode":
      "/blog/introduce-amplify-backend-vscode",
    "/introduce-amplify-flutter-datastore-extension":
      "/blog/introduce-amplify-flutter-datastore-extension",
    "/introduce-slack-app-in-amplify-category-console-notification":
      "/blog/introduce-slack-app-in-amplify-category-console-notification",
    "/jawspankration2021": "/blog/jawspankration2021",
    "/nodefest2016": "/blog/nodefest2016",
    "/nodefest2017": "/blog/nodefest2017",
    "/search-by-postal-code-with-amazon-location-service":
      "/blog/search-by-postal-code-with-amazon-location-service",
  },
});
