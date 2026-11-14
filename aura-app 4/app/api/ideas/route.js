export const dynamic = "force-dynamic";
export const maxDuration = 60;
import { askLLM, profileText, err } from "../../../lib/llm";
import { getLesson } from "../../../lib/content";

export async function POST(req) {
  try {
    const { lessonId, profile, answers } = await req.json();
    const lesson = getLesson(lessonId);
    if (!lesson) return err(new Error("Unknown lesson"), 400);
    const out = await askLLM({
      system: "You are Aura, a personal-brand coach. Give short, specific starting ideas the student can edit. Never write the whole answer for them.",
      user: `${profileText(profile)}
Lesson: ${lesson.title}
Task: ${lesson.task}
What the student wrote so far: ${JSON.stringify(answers || {})}
Give 5 short ideas or examples (max 20 words each) that fit this exact niche and audience. Return JSON: {"ideas": ["..."]}`,
      json: true, maxTokens: 600,
    });
    return Response.json({ ideas: Array.isArray(out.ideas) ? out.ideas.slice(0, 8) : [] });
  } catch (e) { return err(e); }
}
