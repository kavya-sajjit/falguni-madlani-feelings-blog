// Turns Blogger/Word HTML into plain, readable HTML that the site's styles can take over.
const decode = (s) => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/<[^>]+>/g, "").trim();
const norm = (s) => decode(s).toLowerCase().replace(/[^a-z0-9]+/g, "");

export function cleanBloggerHtml(html, title = "") {
  let h = html
    .replace(/<a name=['"]more['"]><\/a>/g, "")                         // "read more" marker
    .replace(/<o:p>[\s\S]*?<\/o:p>/g, "")                                // Word leftovers
    .replace(/\s(?:style|class|align|face|size|border|data-original-(?:height|width))="[^"]*"/g, "")
    .replace(/(<img[^>]*?)\s(?:width|height)="\d+"/g, "$1")
    .replace(/(<img[^>]*?)\s(?:width|height)="\d+"/g, "$1")
    .replace(/<\/?font[^>]*>/g, "")
    .replace(/<\/?span>/g, "")                                           // spans are empty once styles are gone
    .replace(/(src=["'][^"']*googleusercontent[^"']*?)\/s\d+(-[a-z]+)?\//g, "$1/s1600/")
    .replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/g, "")                   // empty paragraphs
    .replace(/ /g, " ");
  // Drop a heading at the top that just repeats the post title (the page already shows it).
  const m = h.match(/^\s*<h[1-6]>([\s\S]*?)<\/h[1-6]>/);
  if (m && title && norm(m[1]) === norm(title)) h = h.slice(m[0].length);
  return h.trim();
}
