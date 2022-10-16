import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://mariadue.net",
  integrations: [svelte(), sitemap()],
  trailingSlash: "always",
});
