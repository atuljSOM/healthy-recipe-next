export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/xml');
  res.write(`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://dailyhealthyrecipe.com/</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
  </urlset>`);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
