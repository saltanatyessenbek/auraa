// Server-only helper: calls Anthropic or OpenAI depending on which key is set.
export async function askLLM({ system, user, json = false, maxTokens = 1200 }) {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const jsonHint = json ? "\n\nReply with valid JSON only. No markdown, no code fences." : "";

  if (anthropicKey) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": anthropicKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-haiku-5-5",
        max_tokens: maxTokens,
        system: system + jsonHint,
        messages: [{ role: "user", content: user }],
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error?.message || "Anthropic API error");
    const text = (data.content || []).map((c) => c.text || "").join("");
    return json ? parseJSON(text) : text;
  }

  if (openaiKey) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${openaiKey}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        max_tokens: maxTokens,
        ...(json ? { response_format: { type: "json_object" } } : {}),
        messages: [{ role: "system", content: system + jsonHint }, { role: "user", content: user }],
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error?.message || "OpenAI API error");
    const text = data.choices?.[0]?.message?.content || "";
    return json ? parseJSON(text) : text;
  }

  throw new Error("No AI key configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY.");
}

function parseJSON(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("AI did not return JSON");
  return JSON.parse(text.slice(start, end + 1));
}

export function profileText(p) {
  if (!p) return "Unknown user.";
  return `User profile: ${p.role || ""}, age ${p.age || "?"}. Niche: ${p.niche || "?"}. Goal: ${p.goal || "?"}. Dream audience: ${p.audience || "?"}. Main platform: ${p.platform || "?"}. Time per day: ${p.minutes || "?"} min. Camera comfort: ${p.camera || "?"}.`;
}

export const err = (e, status = 500) => Response.json({ error: e?.message || String(e) }, { status });
