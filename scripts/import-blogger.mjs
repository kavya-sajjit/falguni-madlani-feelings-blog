// Copies every post from the old Blogger blog into src/content/posts/ as Markdown files.
//
//   BLOGGER_URL=https://example.blogspot.com npm run import-blogger
//
// Safe to run again: existing files are only overwritten if the post changed on Blogger,
// and posts written on the new site (without `blogger_id`) are never touched.
// Images stay hosted on Blogger's servers, so nothing is lost if this runs again later.
import fs from "node:fs/promises";
import path from "node:path";

const BLOG = (process.env.BLOGGER_URL || process.argv[2] || "").replace(/\/$/, "");
if (!BLOG) {
  console.error("Set BLOGGER_URL, e.g. BLOGGER_URL=https://example.blogspot.com npm run import-blogger");
  process.exit(1);
}
const OUT = path.resolve("src/content/posts");
await fs.mkdir(OUT, { recursive: true });

const yaml = (s) => JSON.stringify(String(s ?? "")); // JSON strings are valid YAML

function slugFrom(entry) {
  const href = (entry.link || []).find((l) => l.rel === "alternate")?.href ?? "";
  const m = href.match(/\/(\d{4})\/(\d{2})\/([^/]+?)(?:\.html)?$/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  const id = entry.id.$t.split("post-").pop();
  return `post-${id}`;
}

function cleanHtml(html) {
  return html
    .replace(/<a name=['"]more['"]><\/a>/g, "")      // Blogger "read more" marker
    .replace(/(src=["'][^"']*googleusercontent[^"']*?)\/s\d+(-[a-z]+)?\//g, "$1/s1600/") // full-size images
    .replace(/\s(?:face|size)="[^"]*"/g, "")         // old <font> attributes
    .replace(/<\/?font[^>]*>/g, "")
    .replace(/ /g, " ");
}

function firstImage(html) {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/);
  return m ? m[1].replace(/\/s\d+(-[a-z]+)?\//, "/s1600/") : undefined;
}

let start = 1, total = 0, written = 0;
for (;;) {
  const feed = `${BLOG}/feeds/posts/default?alt=json&max-results=150&start-index=${start}`;
  const res = await fetch(feed);
  if (!res.ok) throw new Error(`${res.status} fetching ${feed}`);
  const entries = (await res.json()).feed.entry ?? [];
  if (!entries.length) break;

  for (const e of entries) {
    const id = e.id.$t.split("post-").pop();
    const html = cleanHtml(e.content?.$t ?? e.summary?.$t ?? "");
    const cover = firstImage(html);
    const labels = (e.category || []).map((c) => c.term);
    const front = [
      "---",
      `title: ${yaml(e.title.$t || "Untitled")}`,
      `date: ${e.published.$t}`,
      cover ? `image: ${yaml(cover)}` : null,
      labels.length ? `labels: ${JSON.stringify(labels)}` : null,
      `blogger_id: ${yaml(id)}`,
      "---",
      "",
    ].filter((l) => l !== null).join("\n");
    const file = path.join(OUT, `${slugFrom(e)}.md`);
    const body = front + `<div class="blogger">\n${html}\n</div>\n`;
    const old = await fs.readFile(file, "utf8").catch(() => null);
    if (old !== body) { await fs.writeFile(file, body); written++; }
    total++;
  }
  start += entries.length;
}
console.log(`${total} posts on Blogger, ${written} new or updated files in src/content/posts/`);
