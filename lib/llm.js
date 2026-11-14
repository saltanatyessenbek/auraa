// Server-only helper: calls Anthropic, OpenAI or Google Gemini depending on which key is set.
export async function askLLM({ system, user, json = false, maxTokens = 1200 }) {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const jsonHint = json ? "\n\nReply with valid JSON only. No markdown, no code fences." : "";

  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    const models = [process.env.GEMINI_MODEL, "gemini-flash-latest", "gemini-2.5-flash"].filter(Boolean);
    let lastErr;
    for (const model of models) {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system + jsonHint }] },
          contents: [{ role: "user", parts: [{ text: user }] }],
          generationConfig: { maxOutputTokens: 8192, ...(json ? { responseMimeType: "application/json" } : {}) },
        }),
      });
      const data = await res.json();
      if (res.status === 404) { lastErr = new Error(`Gemini model ${model} not found`); continue; }
      if (!res.ok) throw new Error(data?.error?.message || "Gemini API error");
      const text = (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("");
      return json ? parseJSON(text) : text;
    }
    throw lastErr || new Error("Gemini API error");
  }

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

  throw new Error("[Aura v2] No AI key found. Add GEMINI_API_KEY in Vercel → Settings → Environment Variables, then redeploy.");
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

export function providerName() {
  if (process.env.GEMINI_API_KEY) return "gemini";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.OPENAI_API_KEY) return "openai";
  return "none";
}
