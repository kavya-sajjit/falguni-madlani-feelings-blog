import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// When a custom domain is bought: set site to "https://<domain>", base to "/",
// and add public/CNAME containing the domain.
export default defineConfig({
  site: "https://kavya-sajjit.github.io",
  base: "/falguni-madlani-feelings-blog",
  trailingSlash: "always",
  integrations: [sitemap()],
});
