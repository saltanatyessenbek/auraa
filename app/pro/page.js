"use client";
import Link from "next/link";
import { useAura } from "../../lib/store";
import { Logo, Loading } from "../../components/ui";

export default function Pro() {
  const [s, update] = useAura();
  if (!s) return <Loading />;
  const started = s.profile && s.avatar;
  return (
    <div className="wrap">
      <header className="header"><Link href="/" aria-label="Aura home"><Logo /></Link><Link className="chip" href={started ? "/course" : "/"}>{started ? "Back to course" : "Back home"}</Link></header>
      <div className="grid g2">
        <div className="card dark col" style={{ padding: 40 }}>
          <span className="pill" style={{ background: "#FFD43B", color: "#121212" }}>Aura Pro</span>
          <h1 className="big">$12 / month</h1>
          <ul className="col" style={{ margin: 0, paddingLeft: 20, gap: 8, fontSize: 17 }}>
            <li>All 7 blocks, from Video Production to Real Launch</li>
            <li>Unlimited AI coach</li>
            <li>Life refills and streak freezes</li>
            <li>Tracking for your real Shorts</li>
          </ul>
          {s.pro
            ? <p style={{ color: "#FFD43B", fontWeight: 700 }}>Pro is active on this browser.</p>
            : <button type="button" className="btn yellow" style={{ alignSelf: "flex-start" }} onClick={() => update((st) => ({ ...st, pro: true }))}>Activate Pro (demo: free)</button>}
          <p className="small" style={{ color: "#D9D6E8" }}>Hackathon demo: payments are not connected, so Pro is free to try.</p>
        </div>
        <div className="card col" style={{ padding: 40 }}>
          <h2 style={{ fontSize: 32 }}>Add-ons</h2>
          <div className="col" style={{ background: "var(--soft)", borderRadius: 18, padding: 18 }}>
            <strong>Refill 3 lives · $4.99</strong>
            <p className="small muted">Out of lives? Refill now instead of waiting 7 days.</p>
            <button type="button" className="btn" style={{ alignSelf: "flex-start" }} disabled={s.lives === 3} onClick={() => update((st) => ({ ...st, lives: 3, livesEmptyAt: null }))}>{s.lives === 3 ? "Lives are full" : "Refill (demo: free)"}</button>
          </div>
          <Link className="btn light" href={started ? "/course" : "/quiz"} style={{ alignSelf: "flex-start" }}>{started ? "Back to my course" : "Start free"}</Link>
        </div>
      </div>
    </div>
  );
}
