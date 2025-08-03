export default function handler(req, res) {
  const baseUrl = 'https://dailyhealthyrecipe.com';

  const staticPages = [
    '', // homepage
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map(
        (page) => `
      <url>
        <loc>${baseUrl}/${page}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
    `
      )
      .join('')}
  </urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
}
