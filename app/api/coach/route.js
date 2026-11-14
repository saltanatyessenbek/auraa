export const dynamic = "force-dynamic";
import { askLLM, profileText, err } from "../../../lib/llm";

export async function POST(req) {
  try {
    const { messages, profile, progress } = await req.json();
    const history = (messages || []).slice(-12).map((m) => `${m.role === "user" ? "User" : "Coach"}: ${m.text}`).join("\n");
    const reply = await askLLM({
      system: `You are Aura's AI coach for personal branding through short videos (Instagram Reels, YouTube Shorts, TikTok).
You know the user's profile and progress. Be concrete, warm and brief (max 120 words). Give examples in their niche. No markdown headers.`,
      user: `${profileText(profile)}
Progress: ${progress || "unknown"}

Conversation:
${history}

Coach:`,
      maxTokens: 500,
    });
    return Response.json({ reply: String(reply).trim() });
  } catch (e) { return err(e); }
}
