"use client";
import Link from "next/link";
import { useAura } from "../lib/store";
import { LEVELS } from "../lib/content";
import { Heart, Logo } from "../components/ui";

export default function Landing() {
  const [s] = useAura();
  const started = s?.profile && s?.avatar;
  const start = started ? "/course" : "/quiz";
  const cta = started ? "Continue my course" : "Create my avatar";

  return (
    <div className="wrap">
      <header className="header">
        <Logo />
        <nav className="row" aria-label="Main">
          <a className="chip" href="#how">How it works</a>
          <a className="chip" href="#who">Who it's for</a>
          <a className="chip" href="#levels">Avatar &amp; levels</a>
          <a className="chip" href="#pricing">Pricing</a>
          <a className="chip" href="#faq">FAQ</a>
        </nav>
        <Link className="btn" href={start}>{started ? "Continue" : "Start free"}</Link>
      </header>

      <section className="panel pinkbg row" style={{ justifyContent: "space-between", gap: 40, alignItems: "center" }}>
        <div className="col" style={{ flex: "1 1 480px", gap: 22 }}>
          <span className="pill" style={{ background: "rgba(255,255,255,.7)", color: "#121212" }}>A personal brand trainer for experts who want clients</span>
          <h1 className="hero-title">Aurafarm.<br />Be extra.</h1>
          <p style={{ fontSize: 19, lineHeight: 1.5, maxWidth: 540 }}>Aura turns personal branding into a game. Learn step by step, test every post on an AI audience, and level up your avatar from Noob to Pro.</p>
          <div className="row">
            <Link className="btn" href={start}>{cta}</Link>
            <a className="btn white" href="#how">How it works</a>
          </div>
          <p className="small">No sign-up. Your progress stays in this browser.</p>
        </div>
        <div className="card col" style={{ flex: "0 1 400px", gap: 14 }}>
          <img className="avatar" src="/avatars/bob-1-noob.png" alt="An avatar at level 1, Noob" />
          <div className="row" style={{ justifyContent: "space-between" }}>
            <strong>Level 1 · Noob</strong>
            <span className="row" style={{ gap: 2 }}><Heart full /><Heart full /><Heart full /></span>
          </div>
        </div>
      </section>

      <section id="how" className="panel violet col" style={{ gap: 32 }}>
        <span className="pill" style={{ background: "rgba(255,255,255,.18)", color: "#fff", alignSelf: "center" }}>How it works</span>
        <h2 className="big" style={{ textAlign: "center" }}>From zero to a working brand in 4 steps</h2>
        <div className="grid g4">
          {[
            ["1", "Take the quiz", "Who you are, your niche, dream audience and goal.", "var(--pink)"],
            ["2", "Get your course", "7 blocks, from positioning to a real launch. Lessons open step by step.", "var(--yellow)"],
            ["3", "Pass tasks, test on AI fans", "An AI audience checks every task. Fail and you lose a life.", "var(--lime)"],
            ["4", "Launch for real", "Track your real Shorts and ask the AI coach anytime.", "var(--sky)"],
          ].map(([n, t, d, c]) => (
            <div key={n} className="card col" style={{ color: "#121212" }}>
              <div className="badge" style={{ background: c, width: 56, height: 56, fontSize: 24 }}>{n}</div>
              <h3 style={{ fontSize: 22 }}>{t}</h3>
              <p className="muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="levels" className="panel" style={{ background: "#fff" }}>
        <div className="col" style={{ gap: 24 }}>
          <span className="pill">Your avatar grows with you</span>
          <h2 className="big">Noob today. Pro tomorrow.</h2>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))" }}>
            {LEVELS.map((l) => (
              <div key={l.n} className="col" style={{ background: l.n === 7 ? "#121212" : "var(--soft)", color: l.n === 7 ? "#fff" : "inherit", borderRadius: 18, padding: 12, gap: 8 }}>
                <img className="avatar" style={{ borderRadius: 14 }} src={`/avatars/bob-${l.file}.png`} alt={`Avatar at ${l.name}`} />
                <span className="small" style={{ fontWeight: 600, color: l.n === 7 ? "#FFD43B" : "var(--violet)" }}>LEVEL {l.n}</span>
                <strong>{l.name}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="who" className="grid g3">
        {[
          ["Experts", "Nutritionists, coaches, therapists", "“I'm an expert, but nobody knows me.”", "var(--pink)"],
          ["Freelancers", "Designers, developers, writers", "“I'm good at my job, but I can't sell myself.”", "var(--sky)"],
          ["Local business", "Cafés, salons, studios", "“No time for content.”", "var(--lime)"],
        ].map(([k, t, q, c]) => (
          <div key={k} className="card col" style={{ background: c, minHeight: 240, justifyContent: "flex-end" }}>
            <span className="small" style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>{k}</span>
            <h3 style={{ fontSize: 26 }}>{t}</h3>
            <p>{q}</p>
          </div>
        ))}
      </section>

      <section className="grid g2">
        <div className="card col">
          <span className="pill" style={{ background: "#FFE3F1", color: "#121212" }}>The rules</span>
          <h2 style={{ fontSize: 36 }}>3 lives. Real stakes.</h2>
          <ul className="col" style={{ margin: 0, paddingLeft: 20, gap: 6, fontSize: 16 }}>
            <li>Fail a task or skip a day: lose a life</li>
            <li>Lives refill in 7 days</li>
            <li>Streaks grow every day you practice</li>
          </ul>
          <div className="row" style={{ background: "var(--soft)", borderRadius: 18, padding: 12 }}>
            <img src="/avatars/bob-0-sleep.png" alt="Avatar asleep at 0 lives" style={{ width: 84, borderRadius: 14 }} />
            <span>0 lives: your avatar falls asleep until you refill.</span>
          </div>
        </div>
        <div className="card col violet">
          <h2 style={{ fontSize: 36 }}>Not another course</h2>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="col" style={{ background: "rgba(255,255,255,.12)", borderRadius: 18, padding: 18, gap: 8 }}>
              <strong>Online courses</strong><span>✕ Watch videos</span><span>✕ Same plan for all</span><span>✕ No feedback</span>
            </div>
            <div className="col" style={{ background: "#fff", color: "#121212", borderRadius: 18, padding: 18, gap: 8 }}>
              <strong style={{ color: "var(--violet)" }}>Aura</strong><span>✓ Real tasks</span><span>✓ Built for your niche</span><span>✓ AI audience reacts</span>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="panel col" style={{ background: "#fff", gap: 28 }}>
        <h2 className="big" style={{ textAlign: "center" }}>Simple pricing</h2>
        <div className="grid g3">
          <div className="col" style={{ background: "var(--soft)", borderRadius: 22, padding: 28 }}>
            <strong>Free</strong>
            <span style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 44 }}>$0</span>
            <p>Quiz, avatar, blocks 1–2, 3 lives.</p>
            <Link className="btn white" href={start}>Start free</Link>
          </div>
          <div className="col dark" style={{ borderRadius: 22, padding: 28 }}>
            <strong style={{ color: "#FFD43B" }}>Pro</strong>
            <span style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 44 }}>$12<span style={{ fontSize: 18 }}>/mo</span></span>
            <p>All 7 blocks, unlimited AI coach, life refills.</p>
            <Link className="btn yellow" href="/pro">See Pro</Link>
          </div>
          <div className="col" style={{ background: "var(--soft)", borderRadius: 22, padding: 28 }}>
            <strong>Add-ons</strong>
            <span style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 44 }}>$4.99</span>
            <p>Refill 3 lives now instead of waiting 7 days.</p>
            <Link className="btn white" href="/pro">See add-ons</Link>
          </div>
        </div>
      </section>

      <section id="faq" className="panel violet col" style={{ gap: 24 }}>
        <h2 className="big" style={{ textAlign: "center" }}>Questions</h2>
        <div className="grid g2">
          {[
            ["Do I need to sign up?", "No. Your avatar and progress are saved in this browser."],
            ["What is the AI audience?", "Five AI viewers (a future client, a skeptic, a beginner, an expert, a hater) react to your work before real people do."],
            ["What happens at 0 lives?", "Your avatar falls asleep for 7 days. Use the time to review your mistakes."],
            ["Which platforms?", "Instagram Reels and YouTube Shorts first. TikTok tips are inside too."],
          ].map(([q, a]) => (
            <div key={q} className="card col" style={{ color: "#121212" }}><h3 style={{ fontSize: 19 }}>{q}</h3><p className="muted">{a}</p></div>
          ))}
        </div>
      </section>

      <section className="panel dark row" style={{ justifyContent: "space-between", gap: 32 }}>
        <div className="col" style={{ flex: "1 1 420px", gap: 18 }}>
          <Logo white h={60} />
          <h2 className="big">Ready to farm your aura?</h2>
          <p style={{ color: "#D9D6E8" }}>Answer a few quick questions and get your personal course.</p>
          <Link className="btn white" href={start} style={{ alignSelf: "flex-start" }}>{started ? "Continue my course" : "Start the quiz"}</Link>
        </div>
        <img src="/avatars/bob-7-pro.png" alt="Avatar at level 7, Pro" style={{ width: 280, borderRadius: 24 }} />
      </section>
    </div>
  );
}
