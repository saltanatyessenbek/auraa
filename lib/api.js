// Client helper: never crashes on non-JSON responses (e.g. a Vercel timeout page).
export async function readJSON(r) {
  const text = await r.text();
  try { return JSON.parse(text); }
  catch {
    if (r.status === 504 || /timeout|timed out/i.test(text)) return { error: "The AI took too long to answer. Press the button again." };
    return { error: "The AI is very busy right now. Wait a few seconds and press the button again." };
  }
}
