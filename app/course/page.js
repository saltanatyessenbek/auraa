"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAura, levelOf, levelInfo, blockStatus, nextLesson, lessonOpen, avatarSrc } from "../../lib/store";
import { BLOCKS, LEVELS } from "../../lib/content";
import { AppHeader, Loading, Lock } from "../../components/ui";

export default function Course() {
  const [s] = useAura();
  const router = useRouter();
  useEffect(() => {
    if (!s) return;
    if (!s.profile) router.replace("/quiz");
    else if (!s.avatar) router.replace("/avatar");
    else if (s.lives === 0) router.replace("/rest");
  }, [s, router]);
  if (!s || !s.profile || !s.avatar || s.lives === 0) return <Loading />;

  const lvl = levelOf(s);
  const info = levelInfo(lvl);
  const nxt = nextLesson(s);
  const done = Object.keys(s.completed).length;

  return (
    <div className="wrap">
      <AppHeader s={s} />
      <div className="layout3">
        <aside className="card violet col">
          <span className="pill" style={{ background: "rgba(255,255,255,.18)", color: "#fff" }}>{s.avatar.name}</span>
          <img className="avatar" src={avatarSrc(s)} alt={`Your avatar at ${info.name}`} />
          <div className="row" style={{ justifyContent: "space-between" }}><h2>{info.name}</h2><span className="small">Level {lvl} of 7</span></div>
          <p className="small">{lvl < 7 ? `Finish one more block to become ${LEVELS[lvl].name}` : "Top level reached"}</p>
          <div className="card grid" style={{ color: "#121212", padding: 16, gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[["hook", "Hook power"], ["clarity", "Clarity"], ["audience", "Audience insight"], ["story", "Storytelling"], ["trust", "Trust"]].map(([k, n]) => (
              <div key={k}><div style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 22 }}>{s.stats[k]}</div><span className="small">{n}</span></div>
            ))}
          </div>
        </aside>

        <main className="card col">
          <span className="pill">Your course · {s.profile.niche}</span>
          <h1 style={{ fontSize: 36 }}>7 blocks to your first clients</h1>
          <p className="muted small">{done} of 24 lessons done. Every finished block levels up your avatar.</p>
          {BLOCKS.map((b) => {
            const st = blockStatus(s, b);
            const open = st === "open";
            const bg = st === "done" ? "#E6F8D6" : open ? "var(--lav)" : "var(--soft)";
            return (
              <div key={b.id} className="col" style={{ background: bg, borderRadius: 18, padding: 16, gap: 12, border: open ? "2px solid var(--violet)" : "2px solid transparent" }}>
                <div className="row" style={{ gap: 16, flexWrap: "nowrap" }}>
                  <span className="badge" style={{ background: st === "done" ? "var(--green)" : open ? "var(--violet)" : "#ECEAF3", color: "#fff" }}>{st === "done" ? "✓" : open ? b.id : <Lock />}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 17 }}>{b.id}. {b.title}</div>
                    <div className="small muted">
                      {st === "done" && "Done"}
                      {open && b.goal}
                      {st === "locked" && `Finish block ${b.id - 1} to open · ${b.lessons.map((l) => l.title).join(", ")}`}
                      {st === "soon" && "Coming soon"}
                    </div>
                  </div>
                </div>
                {(open || st === "done") && b.lessons.length > 0 && (
                  <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 }}>
                    {b.lessons.map((l) => {
                      const ok = s.completed[l.id];
                      const can = lessonOpen(s, l.id);
                      const label = `${l.id.replace("-", ".")} ${l.title}`;
                      if (!can) return <span key={l.id} className="small" style={{ background: "#fff", color: "#5F5B6E", borderRadius: 12, padding: 10, fontWeight: 600 }}>{label}</span>;
                      return (
                        <Link key={l.id} href={`/lesson/${l.id}`} className="small" style={{ textDecoration: "none", background: ok ? "#fff" : "var(--violet)", color: ok ? "#121212" : "#fff", borderRadius: 12, padding: 10, fontWeight: 600 }}>
                          {ok ? "✓ " : "▶ "}{label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </main>

        <aside className="col" style={{ gap: 20 }}>
          {nxt ? (
            <div className="card pinkbg col">
              <span className="pill" style={{ background: "#fff", color: "#121212" }}>Today's aurafarm</span>
              <h2 style={{ fontSize: 28 }}>Lesson {nxt.id.replace("-", ".")}: {nxt.title}</h2>
              <p>{nxt.task}</p>
              <p className="small" style={{ fontWeight: 600 }}>+80 XP · fail = −1 life</p>
              <Link className="btn" href={`/lesson/${nxt.id}`}>Continue lesson</Link>
            </div>
          ) : (
            <div className="card pinkbg col">
              <h2 style={{ fontSize: 26 }}>All 24 lessons done</h2>
              <p>You finished every lesson. Time to launch for real!</p>
              <Link className="btn" href="/track">Track a real Short</Link>
            </div>
          )}
          <div className="card col">
            <strong>Each lesson in 7 steps</strong>
            <p className="small muted">Theory → Video → Key points → Practice → Simulation → AI feedback → Avatar progress</p>
          </div>
          <div className="card dark col">
            <strong>Stuck? Ask the AI coach</strong>
            <p className="small" style={{ color: "#D9D6E8" }}>It knows your niche, audience and progress.</p>
            <Link className="btn yellow" href="/coach">Open AI coach</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
