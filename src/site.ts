export const SITE = {
  author: "Falguni Madlani",
  title: "Feelings",
  fullTitle: "Feelings, by Falguni Madlani",
  description:
    "Feelings is the personal blog of Falguni Madlani: reflections on life, family, nature and the small moments in between.",
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
