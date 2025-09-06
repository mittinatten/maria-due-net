import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://mariadue.net",
  integrations: [sitemap({
    filter: (page) => !page.includes("press-draft")
  })],
  trailingSlash: "always",
  output: 'static',
  image: {
    remotePatterns: [{ protocol: "https" }],
  }
});
