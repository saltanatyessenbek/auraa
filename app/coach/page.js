"use client";
import { useState } from "react";
import Link from "next/link";
import { useAura, levelOf, levelInfo, avatarSrc } from "../../lib/store";
import { AppHeader, Loading } from "../../components/ui";

const STARTERS = ["Give me 3 Reels ideas for this week", "How do I stop feeling cringe on camera?", "Rewrite my bio so clients understand what I do"];

export default function Coach() {
  const [s] = useAura();
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  if (!s) return <Loading />;
  if (!s.profile || !s.avatar) return <div className="wrap"><div className="card col"><h2>Take the quiz first so the coach knows you</h2><Link className="btn" href="/quiz" style={{ alignSelf: "flex-start" }}>Take the quiz</Link></div></div>;

  const send = async (t) => {
    const q = (t ?? text).trim();
    if (!q || busy) return;
    const next = [...msgs, { role: "user", text: q }];
    setMsgs(next); setText(""); setBusy(true); setError("");
    try {
      const progress = `Level ${levelOf(s)} (${levelInfo(levelOf(s)).name}), ${Object.keys(s.completed).length} lessons done, ${s.lives} lives.`;
      const r = await fetch("/api/coach", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: next, profile: s.profile, progress }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setMsgs([...next, { role: "coach", text: d.reply }]);
    } catch (e) { setError(e.message || "Something went wrong"); } finally { setBusy(false); }
  };

  return (
    <div className="wrap">
      <AppHeader s={s} />
      <div className="card col" style={{ maxWidth: 860, width: "100%", margin: "0 auto", gap: 16 }}>
        <div className="row">
          <img src={avatarSrc(s)} alt="" style={{ width: 56, borderRadius: 16 }} />
          <div><h2 style={{ fontSize: 26 }}>AI coach</h2><span className="small muted">Knows your niche ({s.profile.niche}), audience and progress</span></div>
        </div>
        <div className="col" style={{ gap: 10, minHeight: 280 }}>
          {msgs.length === 0 && <p className="muted">Ask anything about your brand, content or clients. Try one of these:</p>}
          {msgs.map((m, i) => (
            <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", whiteSpace: "pre-wrap", background: m.role === "user" ? "#121212" : "var(--soft)", color: m.role === "user" ? "#fff" : "#121212", borderRadius: 18, padding: "12px 14px", lineHeight: 1.5 }}>{m.text}</div>
          ))}
          {busy && <div className="small muted">Coach is typing…</div>}
          {error && <div className="error">{error}</div>}
        </div>
        {msgs.length === 0 && <div className="row">{STARTERS.map((t) => <button key={t} type="button" className="chip" style={{ border: "none", cursor: "pointer", font: "inherit", fontSize: 14 }} onClick={() => send(t)}>{t}</button>)}</div>}
        <form className="row" onSubmit={(e) => { e.preventDefault(); send(); }} style={{ flexWrap: "nowrap" }}>
          <label style={{ flex: 1 }}><span style={{ position: "absolute", left: -9999 }}>Message the coach</span>
            <input className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask anything about your brand" />
          </label>
          <button type="submit" className="btn violet" disabled={!text.trim() || busy}>Send</button>
        </form>
      </div>
    </div>
  );
}
