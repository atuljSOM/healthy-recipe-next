export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).end(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dailyhealthyrecipe.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
