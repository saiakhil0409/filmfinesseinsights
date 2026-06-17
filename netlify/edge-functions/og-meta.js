const SUPABASE_URL = 'https://wppnbzhevvxduhsuecos.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwcG5iemhldnZ4ZHVoc3VlY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1ODkwOTIsImV4cCI6MjA5NzE2NTA5Mn0.vnc2I3zTRIixk2JlF7MhX2Mz5OhdjujxjQib0pZ3IDw';

export default async function handler(request, context) {
  const url = new URL(request.url);

  // Only handle index.html with a ?review= param
  const idSuffix = url.searchParams.get('review');
  if (!idSuffix) {
    return context.next();
  }

  // Fetch all reviews from Supabase
  let review = null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/reviews?select=data`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );
    const rows = await res.json();
    const all = rows.map(r => r.data);
    review = all.find(r => r.id && r.id.slice(-6) === idSuffix);
  } catch (e) {
    // If Supabase fetch fails, just serve the page normally
    return context.next();
  }

  if (!review) {
    return context.next();
  }

  // Get the original page HTML
  const response = await context.next();
  const html = await response.text();

  // Build meta values
  const title   = `${review.title} — Film Finesse Insights`;
  const desc    = ((review.bodyHtml || '').replace(/<[^>]+>/g, '').trim()).slice(0, 160);
  const image   = review.cover && review.cover.startsWith('http') ? review.cover : '';
  const pageUrl = request.url;

  const esc = (s) => String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  // Inject OG + Twitter meta tags — replace existing ones
  const metaHtml = `
    <meta property="og:type"        content="article">
    <meta property="og:site_name"   content="Film Finesse Insights">
    <meta property="og:title"       content="${esc(title)}">
    <meta property="og:description" content="${esc(desc)}">
    <meta property="og:image"       content="${esc(image)}">
    <meta property="og:url"         content="${esc(pageUrl)}">
    <meta property="og:image:width"  content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card"        content="summary_large_image">
    <meta name="twitter:title"       content="${esc(title)}">
    <meta name="twitter:description" content="${esc(desc)}">
    <meta name="twitter:image"       content="${esc(image)}">
    <title>${esc(title)}</title>`;

  // Remove old title and OG/twitter meta tags and inject fresh ones
  let newHtml = html
    .replace(/<title>[^<]*<\/title>/, '')
    .replace(/<meta property="og:[^"]*"[^>]*>/g, '')
    .replace(/<meta name="twitter:[^"]*"[^>]*>/g, '')
    .replace(/<meta id="og-[^"]*"[^>]*>/g, '')
    .replace(/<meta id="tw-[^"]*"[^>]*>/g, '')
    .replace('</head>', metaHtml + '\n</head>');

  return new Response(newHtml, {
    status: response.status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=60'
    }
  });
}
