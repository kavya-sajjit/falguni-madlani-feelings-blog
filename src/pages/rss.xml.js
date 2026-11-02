import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE, url, excerpt } from "../site";

export async function GET(context) {
  const posts = (await getCollection("posts", (p) => !p.data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: SITE.fullTitle,
    description: SITE.description,
    site: context.site + url("/").slice(1),
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description ?? excerpt(p.body, 60),
      link: url(`posts/${p.id}/`),
    })),
  });
}
