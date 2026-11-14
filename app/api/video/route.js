export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Picks the most-viewed embeddable video (up to 20 min) among the top YouTube results for a lesson topic.
// Errors return 200 + { error } so the lesson simply shows a "watch on YouTube" link instead.
const cache = new Map();
const WEEK = { "cache-control": "public, s-maxage=604800, stale-while-revalidate=86400" };

function minutes(iso = "") {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return (+m[1] || 0) * 60 + (+m[2] || 0) + (+m[3] || 0) / 60;
}
async function getJSON(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(10000), cache: "no-store" });
  const d = await r.json();
  if (!r.ok) throw new Error(d?.error?.message || `YouTube HTTP ${r.status}`);
  return d;
}

export async function GET(req) {
  try {
    const key = process.env.YOUTUBE_API_KEY;
    if (!key) return Response.json({ error: "YOUTUBE_API_KEY is not set in Vercel" });
    const q = (new URL(req.url).searchParams.get("q") || "").slice(0, 100);
    if (!q) return Response.json({ error: "No topic" });
    if (cache.has(q)) return Response.json(cache.get(q), { headers: WEEK });

    const sd = await getJSON(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&videoEmbeddable=true&safeSearch=strict&relevanceLanguage=en&maxResults=10&q=${encodeURIComponent(q)}&key=${key}`);
    const ids = (sd.items || []).map((i) => i.id?.videoId).filter(Boolean);
    if (!ids.length) return Response.json({ error: "No video found" });

    const vd = await getJSON(`https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,status,contentDetails&id=${ids.join(",")}&key=${key}`);
    const all = (vd.items || [])
      .filter((x) => x.status?.embeddable !== false && x.status?.privacyStatus === "public")
      .map((x) => ({
        id: x.id,
        title: x.snippet?.title || "",
        channel: x.snippet?.channelTitle || "",
        views: Number(x.statistics?.viewCount || 0),
        likes: Number(x.statistics?.likeCount || 0),
        min: minutes(x.contentDetails?.duration),
      }));
    const short = all.filter((v) => v.min > 0 && v.min <= 20);
    const best = (short.length ? short : all).sort((a, b) => b.views - a.views || b.likes - a.likes)[0];
    if (!best) return Response.json({ error: "No embeddable video" });
    cache.set(q, best);
    return Response.json(best, { headers: WEEK });
  } catch (e) {
    console.error("video:", e?.message);
    return Response.json({ error: e?.message || "YouTube error" });
  }
}
