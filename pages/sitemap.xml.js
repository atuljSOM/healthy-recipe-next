export async function getServerSideProps({ res }) {
  const baseUrl = 'https://dailyhealthyrecipe.com';

  const staticPages = [
    '',
    'about',
    'contact',
    'privacy',
    'terms'
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map(
        (page) => `
      <url>
        <loc>${baseUrl}/${page}</loc>
        <changefreq>monthly</changefreq>
        <priority>${page === '' ? '1.0' : '0.5'}</priority>
      </url>`
      )
      .join('')}
  </urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
