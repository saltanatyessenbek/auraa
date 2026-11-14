export const dynamic = "force-dynamic";
import { err } from "../../../lib/llm";

// Real YouTube Shorts for a niche: search.list (100 units) + videos.list (1 unit).
const cache = new Map();

export async function GET(req) {
  try {
    const key = process.env.YOUTUBE_API_KEY;
    if (!key) return Response.json({ videos: [], note: "YOUTUBE_API_KEY is not set" });
    const q = (new URL(req.url).searchParams.get("q") || "").slice(0, 80);
    if (!q) return Response.json({ videos: [] });
    const hit = cache.get(q);
    if (hit && Date.now() - hit.at < 6 * 60 * 60 * 1000) return Response.json({ videos: hit.videos });

    const s = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoDuration=short&maxResults=6&relevanceLanguage=en&q=${encodeURIComponent(q + " #shorts")}&key=${key}`);
    const sd = await s.json();
    if (!s.ok) throw new Error(sd?.error?.message || "YouTube search error");
    const ids = (sd.items || []).map((i) => i.id.videoId).filter(Boolean);
    if (!ids.length) return Response.json({ videos: [] });
    const v = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${ids.join(",")}&key=${key}`);
    const vd = await v.json();
    if (!v.ok) throw new Error(vd?.error?.message || "YouTube videos error");
    const videos = (vd.items || []).map((x) => ({
      id: x.id, title: x.snippet.title, channel: x.snippet.channelTitle,
      thumb: x.snippet.thumbnails?.medium?.url || x.snippet.thumbnails?.default?.url,
      views: Number(x.statistics.viewCount || 0), likes: Number(x.statistics.likeCount || 0),
    }));
    cache.set(q, { at: Date.now(), videos });
    return Response.json({ videos });
  } catch (e) { return err(e); }
}
