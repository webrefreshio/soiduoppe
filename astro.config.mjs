import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";  
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
export default defineConfig({
  output: 'static',
  site: "https://soiduoppenew.webrefresh.io",
  base: "/",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [tailwindcss(), sitemap(), mdx()],
});
