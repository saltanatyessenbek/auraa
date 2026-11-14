"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAura, lessonOpen, levelOf, levelInfo, avatarSrc, loseLife, touch } from "../../../lib/store";
import { getLesson, yt, XP_PER_LESSON, PERSONAS, ALL_LESSONS } from "../../../lib/content";
import { readJSON } from "../../../lib/api";
import { AppHeader, Loading, Lock } from "../../../components/ui";

const STEPS = ["Theory", "Video", "Key points", "Practice", "Simulation", "AI feedback", "Avatar progress"];

async function post(url, body) {
  const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const d = await readJSON(r);
  if (!r.ok || d.error) throw new Error(d.error || "Something went wrong");
  return d;
}

export default function LessonPage() {
  const { id } = useParams();
  const router = useRouter();
  const lesson = getLesson(id);
  const [s, update] = useAura();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quiz, setQuiz] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [feed, setFeed] = useState([]);
  const [reply, setReply] = useState("");
  const [defense, setDefense] = useState(null);
  const [lvlBefore, setLvlBefore] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    if (!s) return;
    if (!s.profile || !s.avatar) router.replace("/quiz");
    else if (s.lives === 0) router.replace("/rest");
    else if (!Object.keys(answers).length && s.answers[id]) setAnswers(s.answers[id]);
  }, [s]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (step === 1 && lesson && !video) {
      fetch(`/api/video?q=${encodeURIComponent(lesson.video)}`).then(readJSON).then((d) => setVideo(d)).catch(() => setVideo({ error: true }));
    }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (step === 4 && lesson?.block === 2 && s?.profile && !feed.length) {
      fetch(`/api/feed?q=${encodeURIComponent(s.profile.niche)}`).then((r) => r.json()).then((d) => setFeed(d.videos || [])).catch(() => {});
    }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!lesson) return <div className="wrap"><div className="card col"><h2>Lesson not found</h2><Link className="btn" href="/course" style={{ alignSelf: "flex-start" }}>Back to course</Link></div></div>;
  if (!s || !s.profile || !s.avatar || s.lives === 0) return <Loading />;
  if (!lessonOpen(s, id)) return (
    <div className="wrap"><AppHeader s={s} /><div className="card col"><Lock /><h2>This lesson is locked</h2><p className="muted">{lesson.block >= 3 && !s.pro ? "This block is part of Pro." : "Finish the lessons before it first."}</p><Link className="btn" href={lesson.block >= 3 && !s.pro ? "/pro" : "/course"} style={{ alignSelf: "flex-start" }}>{lesson.block >= 3 && !s.pro ? "See Pro" : "Back to course"}</Link></div></div>
  );

  const result = s.results[id];
  const filledAll = lesson.fields.every((f) => (answers[f.key] || "").trim().length > 0);
  const saveAnswers = (a) => { setAnswers(a); update((st) => ({ ...st, answers: { ...st.answers, [id]: a } })); };

  const getIdeas = async () => {
    setBusy("ideas"); setError("");
    try { setIdeas((await post("/api/ideas", { lessonId: id, profile: s.profile, answers })).ideas); }
    catch (e) { setError(e.message); } finally { setBusy(""); }
  };
  const runSimulation = async () => {
    setBusy("sim"); setError(""); setDefense(null); setReply("");
    try {
      const out = await post("/api/evaluate", { lessonId: id, profile: s.profile, answers });
      update((st) => touch({ ...st, results: { ...st.results, [id]: { ...out, applied: false } } }));
      setStep(4);
    } catch (e) { setError(e.message); } finally { setBusy(""); }
  };
  const sendDefense = async (comment) => {
    setBusy("def"); setError("");
    try { setDefense(await post("/api/defend", { comment, reply, profile: s.profile })); }
    catch (e) { setError(e.message); } finally { setBusy(""); }
  };
  const applyResult = () => {
    if (!result || result.applied) return setStep(result?.passed ? 6 : 3);
    setLvlBefore(levelOf(s));
    if (result.passed) {
      update((st) => {
        const stats = { ...st.stats, [lesson.stat]: st.stats[lesson.stat] + 1 };
        if (defense && defense.score >= 6) stats.trust += 1;
        return touch({ ...st, xp: st.xp + XP_PER_LESSON, stats, completed: { ...st.completed, [id]: true }, results: { ...st.results, [id]: { ...result, applied: true } } });
      });
      setStep(6);
    } else {
      update((st) => loseLife({ ...st, results: { ...st.results, [id]: { ...result, applied: true } } }));
      if (s.lives - 1 <= 0) router.push("/rest");
      else setStep(3);
    }
  };

  const nextAfter = () => {
    const all = ALL_LESSONS.map((l) => l.id);
    const n = all[all.indexOf(id) + 1];
    return n && lessonOpen(s, n) ? `/lesson/${n}` : "/course";
  };

  const skeptic = result?.personas?.find((p) => p.name === "Skeptic") || result?.personas?.[1];
  const hookFields = lesson.battle ? lesson.fields.slice(1) : [];

  return (
    <div className="wrap">
      <AppHeader s={s} />
      <div className="layout3">
        <nav className="card col" aria-label="Lesson steps" style={{ gap: 4 }}>
          <span className="pill">Block {lesson.block} · {lesson.blockTitle}</span>
          <h2 style={{ fontSize: 28, margin: "6px 0 12px" }}>{lesson.id.replace("-", ".")} {lesson.title}</h2>
          {STEPS.map((t, i) => {
            const state = i < step ? "done" : i === step ? "now" : "locked";
            const canGo = i < step && !(i >= 4 && !result);
            return (
              <button key={t} type="button" className="step" disabled={!canGo} onClick={() => canGo && setStep(i)}
                style={{ font: "inherit", border: "none", textAlign: "left", cursor: canGo ? "pointer" : "default", background: state === "now" ? "var(--lav)" : "transparent", outline: state === "now" ? "2px solid var(--violet)" : "none", color: "#121212" }}>
                <span className="dot" style={{ background: state === "done" ? "var(--green)" : state === "now" ? "var(--violet)" : "#ECEAF3", color: "#fff" }}>{state === "done" ? "✓" : state === "now" ? i + 1 : <Lock />}</span>
                <span style={{ fontWeight: state === "now" ? 700 : 600 }}>{t}</span>
              </button>
            );
          })}
          <div className="col" style={{ marginTop: "auto", gap: 6, paddingTop: 16 }}>
            <div className="row small" style={{ justifyContent: "space-between", fontWeight: 600 }}><span>Step {step + 1} of 7</span><span>{Math.round(((step + 1) / 7) * 100)}%</span></div>
            <div className="bar"><div style={{ width: `${((step + 1) / 7) * 100}%` }} /></div>
          </div>
        </nav>

        <main className="card col" style={{ gap: 18 }}>
          {error && <div className="error">{error}</div>}

          {step === 0 && (<>
            <span className="pill">Step 1 · Theory</span>
            <h1 className="big">{lesson.title}</h1>
            <ul className="col" style={{ margin: 0, paddingLeft: 22, gap: 10, fontSize: 17, lineHeight: 1.5 }}>{lesson.theory.map((t) => <li key={t}>{t}</li>)}</ul>
            <button type="button" className="btn" style={{ alignSelf: "flex-end" }} onClick={() => setStep(1)}>Next: video</button>
          </>)}

          {step === 1 && (<>
            <span className="pill">Step 2 · Video</span>
            <h1 className="big">Watch: {lesson.title}</h1>
            {!video && <div className="card" style={{ background: "var(--soft)" }}>Finding the most-watched video on this topic…</div>}
            {video?.id && (<>
              <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", borderRadius: 18, overflow: "hidden", background: "#000" }}>
                <iframe src={`https://www.youtube-nocookie.com/embed/${video.id}`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
              </div>
              <p className="small muted"><strong>{video.title}</strong> · {video.channel} · {video.views.toLocaleString()} views · {video.likes.toLocaleString()} likes. Picked live from YouTube: the most-viewed of the top results for this topic.</p>
            </>)}
            {video && !video.id && (
              <a className="card dark row" href={yt(lesson.video)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", gap: 16 }}>
                <span className="badge" style={{ background: "var(--hot)", width: 56, height: 56 }}><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" fill="#fff" /></svg></span>
                <div><strong>Open on YouTube: “{lesson.video}”</strong><div className="small" style={{ color: "#D9D6E8" }}>Opens in a new tab</div></div>
              </a>
            )}
            <button type="button" className="btn" style={{ alignSelf: "flex-end" }} onClick={() => setStep(2)}>I watched it</button>
          </>)}

          {step === 2 && (<>
            <span className="pill">Step 3 · Key points</span>
            <h1 className="big">Remember these 3 things</h1>
            <div className="grid g3">{lesson.keyPoints.map((k, i) => <div key={k} className="card" style={{ background: ["var(--pink)", "var(--yellow)", "var(--lime)"][i] }}><strong>{k}</strong></div>)}</div>
            <h3 style={{ fontSize: 20 }}>Quick check: {lesson.quiz.q}</h3>
            <div className="col">{lesson.quiz.options.map((o, i) => (
              <button key={o} type="button" className={"choice" + (quiz === i ? " on" : "")} onClick={() => setQuiz(i)}
                style={quiz !== null && i === lesson.quiz.answer ? { borderColor: "var(--green)" } : undefined}>{o}</button>
            ))}</div>
            {quiz !== null && <p style={{ fontWeight: 600, color: quiz === lesson.quiz.answer ? "var(--green)" : "var(--hot)" }}>{quiz === lesson.quiz.answer ? "Correct!" : "Not quite. The green one is right."}</p>}
            <button type="button" className="btn" style={{ alignSelf: "flex-end" }} disabled={quiz !== lesson.quiz.answer} onClick={() => setStep(3)}>Next: practice</button>
          </>)}

          {step === 3 && (<>
            <span className="pill">Step 4 · Practice</span>
            <h1 style={{ fontSize: 34, lineHeight: 1.05 }}>{lesson.task}</h1>
            <p className="muted small">Your niche: {s.profile.niche}. Your audience: {s.profile.audience}.{lesson.example ? ` Example: “${lesson.example}”` : ""}</p>
            {result && !result.passed && result.applied && <div className="error"><strong>Last try: {result.score}/10.</strong> {result.fixes?.join(" ")}</div>}
            {lesson.fields.map((f) => (
              <label key={f.key} className="field">{f.label}
                {f.long
                  ? <textarea className="textarea" value={answers[f.key] || ""} onChange={(e) => saveAnswers({ ...answers, [f.key]: e.target.value })} />
                  : <input className="input" value={answers[f.key] || ""} onChange={(e) => saveAnswers({ ...answers, [f.key]: e.target.value })} />}
              </label>
            ))}
            {ideas.length > 0 && (
              <div className="card" style={{ background: "var(--soft)" }}>
                <strong>AI ideas to get you started (edit them, don't copy):</strong>
                <ul style={{ margin: "8px 0 0", paddingLeft: 20, lineHeight: 1.6 }}>{ideas.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            )}
            <div className="row" style={{ justifyContent: "space-between" }}>
              <button type="button" className="btn light" onClick={getIdeas} disabled={!!busy}>{busy === "ideas" ? <span className="spin" style={{ borderTopColor: "#121212" }} /> : null}Stuck? Get AI ideas</button>
              <button type="button" className="btn" onClick={runSimulation} disabled={!filledAll || !!busy}>{busy === "sim" ? <span className="spin" /> : null}{busy === "sim" ? "Your AI audience is reacting…" : "Test on my AI audience"}</button>
            </div>
          </>)}

          {step === 4 && result && (<>
            <span className="pill">Step 5 · Simulation</span>
            <h1 style={{ fontSize: 34 }}>Your AI audience reacts</h1>
            {lesson.battle && Array.isArray(result.votes) && (
              <div className="col">
                <strong>Hook Battle</strong>
                {hookFields.map((f, i) => (
                  <div key={f.key} className="col" style={{ gap: 6, background: Number(result.winner) === i ? "var(--lav)" : "var(--soft)", border: Number(result.winner) === i ? "2px solid var(--violet)" : "2px solid transparent", borderRadius: 16, padding: 14 }}>
                    <div className="row small" style={{ justifyContent: "space-between", fontWeight: 600 }}><span>{f.label}{Number(result.winner) === i ? " · Winner" : ""}</span><span>{result.votes[i] ?? 0}%</span></div>
                    <span>{answers[f.key]}</span>
                    <div className="bar" style={{ background: "#fff" }}><div style={{ width: `${result.votes[i] ?? 0}%` }} /></div>
                  </div>
                ))}
                {result.why && <p className="small muted">{result.why}</p>}
              </div>
            )}
            {lesson.block === 2 && feed.length > 0 && (
              <div className="col">
                <strong>Your post would compete with these real Shorts in your niche:</strong>
                <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
                  {feed.slice(0, 4).map((v) => (
                    <a key={v.id} href={`https://www.youtube.com/shorts/${v.id}`} target="_blank" rel="noopener noreferrer" className="col" style={{ textDecoration: "none", background: "var(--soft)", borderRadius: 14, padding: 10, gap: 6 }}>
                      {v.thumb && <img src={v.thumb} alt="" style={{ borderRadius: 10, width: "100%" }} />}
                      <span className="small" style={{ fontWeight: 600 }}>{v.title.slice(0, 60)}</span>
                      <span className="small muted">{v.views.toLocaleString()} views · {v.likes.toLocaleString()} likes</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
            <div className="col">
              {(result.personas || PERSONAS.map((n) => ({ name: n }))).map((p) => (
                <div key={p.name} className="comment" style={p.name === "Skeptic" ? { background: "#FFE3F1" } : undefined}>
                  <span className="badge" style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--sky)" }}>{p.name[0]}</span>
                  <div className="col" style={{ gap: 4 }}><strong className="small">{p.name}{p.reaction ? ` · ${p.reaction}` : ""}</strong><span>{p.comment}</span></div>
                </div>
              ))}
            </div>
            {skeptic?.comment && (
              <div className="col">
                <label className="field">Comment defense (optional, +1 Trust): reply to the {skeptic.name}
                  <textarea className="textarea" value={reply} onChange={(e) => setReply(e.target.value)} />
                </label>
                <button type="button" className="btn light" style={{ alignSelf: "flex-start" }} disabled={!reply.trim() || !!busy} onClick={() => sendDefense(skeptic.comment)}>{busy === "def" ? <span className="spin" style={{ borderTopColor: "#121212" }} /> : null}Send reply</button>
                {defense && <div className="card" style={{ background: "var(--soft)" }}><strong>Reply score: {defense.score}/10.</strong> {defense.feedback}<div className="small muted" style={{ marginTop: 6 }}>Stronger version: {defense.better}</div></div>}
              </div>
            )}
            <button type="button" className="btn" style={{ alignSelf: "flex-end" }} onClick={() => setStep(5)}>See AI feedback</button>
          </>)}

          {step === 5 && result && (<>
            <span className="pill">Step 6 · AI feedback</span>
            <div className="row" style={{ alignItems: "baseline" }}>
              <h1 style={{ fontSize: 72, color: result.passed ? "var(--green)" : "var(--hot)" }}>{result.score}/10</h1>
              <strong style={{ fontSize: 20 }}>{result.passed ? "Passed" : "Not yet"}</strong>
            </div>
            <p style={{ fontSize: 18 }}>{result.summary}</p>
            <div className="grid g2">
              <div className="card" style={{ background: "#E6F8D6" }}><strong>What works</strong><ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>{(result.strengths || []).map((x) => <li key={x}>{x}</li>)}</ul></div>
              <div className="card" style={{ background: "#FFF6D1" }}><strong>Fix next</strong><ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>{(result.fixes || []).map((x) => <li key={x}>{x}</li>)}</ul></div>
            </div>
            <button type="button" className="btn" style={{ alignSelf: "flex-end" }} onClick={applyResult}>
              {result.applied ? (result.passed ? "See my progress" : "Improve and retry") : result.passed ? `Claim +${XP_PER_LESSON} XP` : "Lose a life and retry"}
            </button>
          </>)}

          {step === 6 && (<>
            <span className="pill">Step 7 · Avatar progress</span>
            {lvlBefore && levelOf(s) > lvlBefore ? <h1 className="big">Level up! You're now {levelInfo(levelOf(s)).name}</h1> : <h1 className="big">+{XP_PER_LESSON} XP. Lesson done!</h1>}
            <div className="row" style={{ gap: 24 }}>
              <img src={avatarSrc(s)} alt="Your avatar" style={{ width: 220, borderRadius: 24 }} />
              <div className="col">
                <p><strong>You got:</strong> {lesson.result}</p>
                <p>{({ hook: "Hook power", clarity: "Clarity", audience: "Audience insight", story: "Storytelling", trust: "Trust" })[lesson.stat]} +1</p>
                <p>Total: {s.xp} XP · {s.streak}-day streak</p>
              </div>
            </div>
            <div className="row" style={{ justifyContent: "flex-end" }}>
              <Link className="btn light" href="/course">Back to course</Link>
              <Link className="btn" href={nextAfter()}>{nextAfter() === "/course" ? "See what's next" : "Next lesson"}</Link>
            </div>
          </>)}
        </main>

        <aside className="col" style={{ gap: 20 }}>
          <div className="card violet col">
            <img className="avatar" src={avatarSrc(s)} alt="Your avatar" />
            <div className="row" style={{ justifyContent: "space-between" }}><h3 style={{ fontSize: 22 }}>{levelInfo(levelOf(s)).name}</h3><span className="small">Level {levelOf(s)} of 7</span></div>
          </div>
          <div className="card col" style={{ background: "#FFE3F1" }}>
            <strong>Stakes</strong>
            <p className="small">Score under 6/10 = −1 life. You have {s.lives} {s.lives === 1 ? "life" : "lives"} left.</p>
          </div>
          <Link className="card dark col" href="/coach" style={{ textDecoration: "none" }}>
            <strong>Ask the AI coach</strong>
            <span className="small" style={{ color: "#D9D6E8" }}>Get help with this lesson</span>
          </Link>
        </aside>
      </div>
    </div>
  );
}
