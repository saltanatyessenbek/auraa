"use client";
import { useState } from "react";
import Link from "next/link";
import { useAura } from "../../lib/store";
import { AppHeader, Loading } from "../../components/ui";

export default function Track() {
  const [s] = useAura();
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  if (!s) return <Loading />;
  if (!s.profile || !s.avatar) return <div className="wrap"><div className="card col"><h2>Start with the quiz</h2><Link className="btn" href="/quiz" style={{ alignSelf: "flex-start" }}>Take the quiz</Link></div></div>;

  const check = async (e) => {
    e.preventDefault(); setBusy(true); setError(""); setData(null);
    try {
      const r = await fetch(`/api/stats?url=${encodeURIComponent(url)}`);
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setData(d);
    } catch (err) { setError(err.message || "Something went wrong"); } finally { setBusy(false); }
  };

  return (
    <div className="wrap">
      <AppHeader s={s} />
      <div className="card violet col" style={{ gap: 18, padding: 40 }}>
        <span className="pill" style={{ background: "rgba(255,255,255,.18)", color: "#fff" }}>Real results</span>
        <h1 className="big">Track a real Short</h1>
        <p>Paste a link to any public YouTube Short, yours or a competitor's. We pull live numbers from YouTube.</p>
        <form className="row" onSubmit={check} style={{ flexWrap: "nowrap" }}>
          <label style={{ flex: 1 }}><span style={{ position: "absolute", left: -9999 }}>YouTube link</span>
            <input className="input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://youtube.com/shorts/…" />
          </label>
          <button type="submit" className="btn yellow" disabled={!url.trim() || busy}>{busy ? "Checking…" : "Check results"}</button>
        </form>
        {error && <div className="error" style={{ color: "#121212" }}>{error}</div>}
        {data && (
          <div className="col">
            <strong>{data.title} · {data.channel}</strong>
            <div className="grid g3">
              {[["Views", data.views], ["Likes", data.likes], ["Comments", data.comments]].map(([k, v]) => (
                <div key={k} className="card" style={{ color: "#121212" }}><span className="small muted">{k}</span><div style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 36 }}>{v.toLocaleString()}</div></div>
              ))}
            </div>
            <p className="small">Engagement: {data.views ? ((data.likes / data.views) * 100).toFixed(1) : 0}% of viewers liked it.</p>
          </div>
        )}
      </div>
    </div>
  );
}
