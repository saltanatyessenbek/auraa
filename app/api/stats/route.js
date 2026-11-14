export const dynamic = "force-dynamic";
import { err } from "../../../lib/llm";

function videoId(url) {
  const m = String(url).match(/(?:shorts\/|v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  return /^[A-Za-z0-9_-]{11}$/.test(url) ? url : null;
}

export async function GET(req) {
  try {
    const key = process.env.YOUTUBE_API_KEY;
    if (!key) return err(new Error("YOUTUBE_API_KEY is not set"), 500);
    const id = videoId(new URL(req.url).searchParams.get("url") || "");
    if (!id) return err(new Error("Paste a YouTube or Shorts link"), 400);
    const r = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${id}&key=${key}`);
    const d = await r.json();
    if (!r.ok) throw new Error(d?.error?.message || "YouTube error");
    const x = d.items?.[0];
    if (!x) return err(new Error("Video not found or private"), 404);
    return Response.json({
      id, title: x.snippet.title, channel: x.snippet.channelTitle,
      views: Number(x.statistics.viewCount || 0), likes: Number(x.statistics.likeCount || 0), comments: Number(x.statistics.commentCount || 0),
    });
  } catch (e) { return err(e); }
}
