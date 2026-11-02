# Feelings, by Falguni Madlani

The personal blog of Falguni Madlani, built with [Astro](https://astro.build) and published on GitHub Pages:
**https://kavya-sajjit.github.io/falguni-madlani-feelings-blog/**

## Writing a new post (for Falguni)

1. Go to **[app.pagescms.org](https://app.pagescms.org)** and sign in with GitHub.
2. Open **falguni-madlani-feelings-blog**, then **Posts → Add an entry**.
3. Write the title and the post. Add a photo at the top if you like.
4. Press **Save**. The post appears on the site within about two minutes.

To keep something unfinished private, tick **Save as draft**. Untick it when it's ready.

## Bringing posts across from Blogger

Actions tab → **Import from Blogger** → **Run workflow**, then paste the Blogger address.
It copies every post (text, dates, labels; images stay on Blogger's servers) into `src/content/posts/`.
It's safe to run again later: it only adds or updates, and never touches posts written here.

## Developing

```bash
npm install
npm run dev        # http://localhost:4321/falguni-madlani-feelings-blog/
npm run build      # static site in dist/
BLOGGER_URL=https://example.blogspot.com npm run import-blogger
```

| Path | What it is |
|---|---|
| `src/content/posts/` | One Markdown file per post |
| `src/pages/` | Home, post page, archive, about, RSS, 404 |
| `src/components/Fern.astro` | The fern line drawing (generated, drawn on first visit) |
| `src/styles/global.css` | Colours, type scale, reading styles |
| `.pages.yml` | The editor Falguni uses (Pages CMS) |

**Design.** Lichen paper `#edefe7`, moss ink `#1f2a1c`, mulberry links `#7a3e4f`. Young Serif for titles, Literata for reading. One reading column at about 65 characters per line, dates in the margin.

## Being found on Google

The site has a sitemap, canonical URLs, Open Graph previews and schema.org `Person` / `BlogPosting` data.
To get indexed quickly, add the site in [Google Search Console](https://search.google.com/search-console)
(URL-prefix property, HTML-file verification: put the file in `public/`), then submit `sitemap-index.xml`.
Also link the new site from the old Blogger blog's sidebar and her social profiles: links are what make Google trust a new site.

## Custom domain (later)

Buy the domain, then: add `public/CNAME` with the domain, in `astro.config.mjs` set `site` to `https://<domain>` and `base` to `"/"`,
change the media `output` in `.pages.yml` to `/images`, and point the domain's DNS at GitHub Pages
(Settings → Pages → Custom domain).
