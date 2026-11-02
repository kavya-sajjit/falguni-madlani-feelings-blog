export const SITE = {
  author: "Falguni Madlani",
  title: "Feelings",
  fullTitle: "Feelings, by Falguni Madlani",
  description:
    "Feelings is the personal blog of Falguni Madlani, a mother and teacher, writing about family, festivals, exams and everyday life.",
  lang: "en-IN",
};

/** Prefix an internal path with the site's base path. */
export const url = (path = "") =>
  (import.meta.env.BASE_URL.replace(/\/$/, "") + "/" + path.replace(/^\//, "")).replace(/\/{2,}/g, "/");

export const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** Plain-text excerpt from markdown/HTML body. */
export const excerpt = (body = "", words = 38) => {
  const text = body
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`]/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const w = text.split(" ");
  return w.length > words ? w.slice(0, words).join(" ") + "…" : text;
};

/** Where Falguni writes: the Pages CMS editor for this repo. */
export const EDITOR_URL = "https://app.pagescms.org/kavya-sajjit/falguni-madlani-feelings-blog/main/collection/posts";

export const readingTime = (body = "") => {
  const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
};

export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-");

/** Labels across posts, most used first. */
export const allLabels = (posts: any[]) => {
  const counts = new Map<string, number>();
  for (const p of posts) for (const l of p.data.labels ?? []) counts.set(l, (counts.get(l) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
};
