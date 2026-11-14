"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAura } from "../../lib/store";
import { CHARACTERS } from "../../lib/content";
import { Logo, Loading } from "../../components/ui";

export default function AvatarPage() {
  const [s, update] = useAura();
  const router = useRouter();
  const [char, setChar] = useState("bob");
  const [name, setName] = useState("");
  useEffect(() => {
    if (s?.avatar) { setChar(s.avatar.char); setName(s.avatar.name); }
  }, [s?.avatar]);
  if (!s) return <Loading />;
  if (!s.profile) return (
    <div className="wrap"><div className="card col"><h2>First, tell us about you</h2><Link className="btn" href="/quiz" style={{ alignSelf: "flex-start" }}>Take the quiz</Link></div></div>
  );

  const save = () => {
    update((st) => ({ ...st, avatar: { char, name: name.trim() || "My Aura" } }));
    router.push("/course");
  };

  return (
    <div className="wrap">
      <header className="header"><Link href="/" aria-label="Aura home"><Logo /></Link><span className="small" style={{ fontWeight: 600 }}>Last step · your avatar</span><Link className="chip" href="/quiz">Back to quiz</Link></header>
      <div className="grid" style={{ gridTemplateColumns: "minmax(0, 1fr) 420px", alignItems: "start" }}>
        <main className="card col" style={{ gap: 22, padding: 40 }}>
          <span className="pill">Your avatar</span>
          <h1 className="big">Pick the one that feels like you</h1>
          <p className="muted">It levels up with every task you pass. At 0 lives it falls asleep.</p>
          <div className="grid g3">
            {CHARACTERS.map((c) => (
              <button key={c.id} type="button" aria-pressed={char === c.id} onClick={() => setChar(c.id)}
                style={{ border: `4px solid ${char === c.id ? "#5A3CF0" : "transparent"}`, background: "#fff", borderRadius: 24, padding: 0, overflow: "hidden", cursor: "pointer", font: "inherit" }}>
                <img src={`/avatars/${c.id}-1-noob.png`} alt="" style={{ width: "100%", aspectRatio: 1, objectFit: "cover" }} />
                <div style={{ padding: 10, fontWeight: 700 }}>{c.label}{char === c.id ? " · selected" : ""}</div>
              </button>
            ))}
          </div>
          <label className="field">Name your avatar
            <input className="input" value={name} placeholder="e.g. Anna's Aura" onChange={(e) => setName(e.target.value)} />
          </label>
          <button type="button" className="btn" onClick={save} style={{ alignSelf: "flex-end" }}>Build my course</button>
        </main>
        <aside className="card violet col">
          <span className="pill" style={{ background: "rgba(255,255,255,.18)", color: "#fff" }}>How it will grow</span>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            {[["1-noob", "Noob"], ["3-creator", "Creator"], ["7-pro", "Pro"]].map(([f, n]) => (
              <div key={f} className="col" style={{ gap: 6, alignItems: "center" }}>
                <img className="avatar" style={{ borderRadius: 14 }} src={`/avatars/${char}-${f}.png`} alt="" />
                <strong>{n}</strong>
              </div>
            ))}
          </div>
          <p>Profile: {s.profile.role}, {s.profile.niche}. Goal: {s.profile.goal.toLowerCase()}.</p>
        </aside>
      </div>
    </div>
  );
}
