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

The posts from [madlanifalgunis.blogspot.com](https://madlanifalgunis.blogspot.com) were imported automatically on the first push
(text, dates and labels; images stay on Blogger's servers). To pull again later: Actions → **Import from Blogger** → **Run workflow**.
It never touches posts written on the new site, but it **does** overwrite edits made here to an imported post.
Old Blogger-style links (`/2026/09/post-name.html`) redirect to the same post here.

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
| `src/components/Toran.astro` | The marigold-and-mango-leaf toran across the top (generated SVG; settles in once on the home page) |
| `src/components/Share.astro` | WhatsApp / email / copy-link sharing |
| `src/pages/topics/` | Topic pages, from post labels |
| `src/pages/search.astro` | Full-text search ([Pagefind](https://pagefind.app), built at deploy time) |
| `src/pages/write.astro` | Falguni's shortcut to the editor (hidden from Google) |
| `src/styles/global.css` | Colours, type scale, reading styles |
| `.pages.yml` | The editor Falguni uses (Pages CMS) |

**Design.** Like walking into her home: a toran over the door, sun-faded linen paper `#eeede3`, warm ink `#2a2a1f`, marigold `#eea83a` and mango-leaf green `#4f6b34`, with links in darkened marigold `#8f4f0c` so they stay readable. Young Serif for titles, Literata for reading, and Kalam (an Indian handwriting face) only for her sign-offs. One reading column of about 65 characters, with dates, reading time and topics in the margin.

**Her photo.** Put a square photo at `public/images/falguni.jpg` and it appears in the welcome note on the home page.

## Being found on Google

The site has a sitemap, canonical URLs, Open Graph previews and schema.org `Person` / `BlogPosting` data.
To get indexed quickly, add the site in [Google Search Console](https://search.google.com/search-console)
(URL-prefix property, HTML-file verification: put the file in `public/`), then submit `sitemap-index.xml`.
Also link the new site from the old Blogger blog and her social profiles: links are what make Google trust a new site.

**On the old Blogger blog:** Layout → Add a Gadget → HTML/JavaScript, title "My blog has moved", content:

```html
<p>Feelings has a new home. All my posts, old and new, are at
<a href="https://kavya-sajjit.github.io/falguni-madlani-feelings-blog/">Feelings, by Falguni Madlani</a>.</p>
```

Then drag it to the top of the sidebar. Leave the old posts up, so old links keep working.

## Custom domain (later)

Buy the domain, then: add `public/CNAME` with the domain, in `astro.config.mjs` set `site` to `https://<domain>` and `base` to `"/"`,
change the media `output` in `.pages.yml` to `/images`, and point the domain's DNS at GitHub Pages
(Settings → Pages → Custom domain).
