"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAura, avatarSrc, refillIn } from "../../lib/store";
import { AppHeader, Loading, Heart } from "../../components/ui";
import { getLesson } from "../../lib/content";

export default function Rest() {
  const [s, update] = useAura();
  const router = useRouter();
  if (!s) return <Loading />;
  if (!s.profile || !s.avatar) return <div className="wrap"><div className="card col"><h2>Start with the quiz</h2><Link className="btn" href="/quiz" style={{ alignSelf: "flex-start" }}>Take the quiz</Link></div></div>;
  if (s.lives > 0) return (
    <div className="wrap"><AppHeader s={s} /><div className="card col"><h2>You still have {s.lives} {s.lives === 1 ? "life" : "lives"}</h2><Link className="btn" href="/course" style={{ alignSelf: "flex-start" }}>Back to course</Link></div></div>
  );
  const failed = Object.entries(s.results).filter(([, r]) => r.applied && !r.passed);
  const refill = () => { update((st) => ({ ...st, lives: 3, livesEmptyAt: null })); router.push("/course"); };

  return (
    <div className="wrap" style={{ minHeight: "100vh" }}>
      <AppHeader s={s} />
      <div className="card pinkbg grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "center", padding: 48 }}>
        <div className="col" style={{ alignItems: "center" }}>
          <img src={avatarSrc(s, true)} alt="Your avatar is asleep" style={{ width: "100%", maxWidth: 380, borderRadius: 26 }} />
          <strong>{s.avatar.name} is resting</strong>
        </div>
        <div className="col" style={{ gap: 18 }}>
          <div className="row" aria-label="0 of 3 lives"><Heart size={40} /><Heart size={40} /><Heart size={40} /></div>
          <h1 className="big">Out of lives</h1>
          <p style={{ fontSize: 18 }}>Your lives refill in <strong>{refillIn(s) || "7d 0h"}</strong>. Your XP and progress are safe.</p>
          {failed.length > 0 && (
            <div className="card col" style={{ gap: 8 }}>
              <strong>Review while you wait</strong>
              {failed.map(([id, r]) => (
                <div key={id} className="small"><strong>{id.replace("-", ".")} {getLesson(id)?.title}: {r.score}/10.</strong> {(r.fixes || []).join(" ")}</div>
              ))}
            </div>
          )}
          <div className="row">
            <button type="button" className="btn" onClick={refill}>Refill 3 lives · $4.99 (demo: free)</button>
            <Link className="btn white" href="/coach">Talk to the AI coach</Link>
          </div>
          <p className="small">Hackathon demo: payments are not connected, so the refill is free.</p>
        </div>
      </div>
    </div>
  );
}
