export const dynamic = "force-dynamic";
export const maxDuration = 60;
import { askLLM, profileText, err } from "../../../lib/llm";

export async function POST(req) {
  try {
    const { comment, reply, profile } = await req.json();
    if (!reply?.trim()) return err(new Error("Write a reply first"), 400);
    const out = await askLLM({
      system: "You grade how a creator replies to a tough comment. Good replies are calm, specific, show expertise and invite trust. Score 0-10.",
      user: `${profileText(profile)}
Comment: "${comment}"
Creator's reply: "${reply}"
Return JSON: {"score": number, "feedback": "max 30 words", "better": "an improved reply, max 40 words"}`,
      json: true, maxTokens: 500,
    });
    return Response.json({ ...out, score: Math.max(0, Math.min(10, Number(out.score) || 0)) });
  } catch (e) { return err(e); }
}
