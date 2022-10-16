import svelte from "@astrojs/svelte";

export default {
  site: "https://mariadue.net",
  integrations: [svelte()],
  trailingSlash: "always",
};
