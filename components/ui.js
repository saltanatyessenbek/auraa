"use client";
import Link from "next/link";
import { levelOf, levelInfo } from "../lib/store";

export function Heart({ full, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s-8-5.3-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.7-8 11-8 11z"
        fill={full ? "#FF3B7F" : "none"} stroke="#FF3B7F" strokeWidth={full ? 0 : 2} />
    </svg>
  );
}

export function Lives({ n }) {
  return (
    <span className="chip" style={{ background: "#FFE3F1" }} aria-label={`${n} of 3 lives`}>
      {[0, 1, 2].map((i) => <Heart key={i} full={i < n} />)}
    </span>
  );
}

export function Lock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" fill="#8C88A0" />
      <path d="M8 11V8a4 4 0 018 0v3" stroke="#8C88A0" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function Logo({ white, h = 34 }) {
  return <img src={white ? "/aura-logo-white.png" : "/aura-logo.png"} alt="aura." style={{ height: h, width: "auto" }} />;
}

export function AppHeader({ s }) {
  const lvl = levelInfo(levelOf(s));
  return (
    <header className="header">
      <Link href="/" aria-label="Aura home"><Logo /></Link>
      <nav className="row" aria-label="App">
        <Link className="chip" href="/course">Course</Link>
        <Link className="chip" href="/coach">AI coach</Link>
        <Link className="chip" href="/track">Track a Short</Link>
      </nav>
      <div className="row">
        <Lives n={s.lives} />
        <span className="chip" style={{ background: "#FFF6D1" }}>{s.streak}-day streak</span>
        <span className="chip">{s.xp} XP · {lvl.name}</span>
        {!s.pro && <Link className="chip" href="/pro" style={{ background: "#121212", color: "#FFD43B" }}>Go Pro</Link>}
      </div>
    </header>
  );
}

export function Loading() {
  return <div className="wrap"><div className="card">Loading…</div></div>;
}
