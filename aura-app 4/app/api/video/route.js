export const dynamic = "force-dynamic";
import { err } from "../../../lib/llm";

// Picks the most-viewed embeddable video among the top YouTube results for a lesson topic.
const cache = new Map();

export async function GET(req) {
  try {
    const key = process.env.YOUTUBE_API_KEY;
    if (!key) return Response.json({ error: "YOUTUBE_API_KEY is not set" });
    const q = (new URL(req.url).searchParams.get("q") || "").slice(0, 100);
    if (!q) return Response.json({ error: "No topic" });
    const hit = cache.get(q);
    if (hit) return Response.json(hit, { headers: { "cache-control": "public, s-maxage=604800" } });

    const s = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&relevanceLanguage=en&maxResults=10&q=${encodeURIComponent(q)}&key=${key}`);
    const sd = await s.json();
    if (!s.ok) throw new Error(sd?.error?.message || "YouTube search error");
    const ids = (sd.items || []).map((i) => i.id.videoId).filter(Boolean);
    if (!ids.length) return Response.json({ error: "No video found" });
    const v = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,status&id=${ids.join(",")}&key=${key}`);
    const vd = await v.json();
    if (!v.ok) throw new Error(vd?.error?.message || "YouTube videos error");
    const best = (vd.items || [])
      .filter((x) => x.status?.embeddable !== false)
      .map((x) => ({ id: x.id, title: x.snippet.title, channel: x.snippet.channelTitle, views: Number(x.statistics.viewCount || 0), likes: Number(x.statistics.likeCount || 0) }))
      .sort((a, b) => b.views - a.views)[0];
    if (!best) return Response.json({ error: "No embeddable video" });
    cache.set(q, best);
    return Response.json(best, { headers: { "cache-control": "public, s-maxage=604800" } });
  } catch (e) { return err(e); }
}
