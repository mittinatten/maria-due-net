import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://mariadue.net",
  integrations: [sitemap()],
  trailingSlash: "always",
  output: 'static',
});
