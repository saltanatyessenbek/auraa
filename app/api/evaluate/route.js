export const dynamic = "force-dynamic";
import { askLLM, profileText, err } from "../../../lib/llm";
import { getLesson, PERSONAS, PASS_SCORE } from "../../../lib/content";

export async function POST(req) {
  try {
    const { lessonId, answers, profile } = await req.json();
    const lesson = getLesson(lessonId);
    if (!lesson) return err(new Error("Unknown lesson"), 400);
    const filled = lesson.fields.map((f) => `${f.label}: ${(answers?.[f.key] || "").trim() || "(empty)"}`).join("\n");

    const system = `You are Aura, a strict but kind personal-brand coach and a simulated social media audience.
You grade a student's practice task for a short-video personal brand course. Be honest: empty, vague or generic answers fail.
Score 0-10. ${PASS_SCORE}+ means passed. Write in plain, friendly English. Keep every text field under 30 words.`;

    const shape = {
      score: "number 0-10",
      summary: "one sentence verdict",
      strengths: ["what works", "what works"],
      fixes: ["concrete fix", "concrete fix"],
      ...(lesson.simulate ? {
        personas: PERSONAS.map((p) => ({ name: p, comment: "what this viewer would comment, in their voice", reaction: "stay | scroll" })),
      } : {}),
      ...(lesson.battle ? { winner: "index 0-4 of the strongest hook", votes: "array of 5 integers summing to 100, share of viewers who would stay for each hook", why: "why the winner works" } : {}),
    };

    const user = `${profileText(profile)}

Lesson: ${lesson.title}
Task: ${lesson.task}

Student's answer:
${filled}

${lesson.simulate ? `Also simulate how 5 viewers from the student's dream audience react in a short-video feed: ${PERSONAS.join(", ")}. Each writes a realistic comment.` : ""}
${lesson.battle ? "The 5 answers after Topic are 5 hooks (question, myth, number, contrast, conflict). Run a Hook Battle: estimate which hook keeps the most viewers." : ""}

Return JSON with this shape: ${JSON.stringify(shape)}`;

    const out = await askLLM({ system, user, json: true, maxTokens: 1400 });
    const score = Math.max(0, Math.min(10, Number(out.score) || 0));
    return Response.json({ ...out, score, passed: score >= PASS_SCORE });
  } catch (e) { return err(e); }
}
