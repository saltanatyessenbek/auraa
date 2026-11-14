"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAura } from "../../lib/store";
import { Logo, Loading } from "../../components/ui";

const STEPS = [
  { key: "role", q: "Who are you?", options: ["An expert or specialist", "A freelancer", "A business owner", "Building a brand for my career"] },
  { key: "age", q: "How old are you?", input: "number", placeholder: "e.g. 34" },
  { key: "niche", q: "What do you want to be known for?", options: ["Nutrition & health", "Fitness", "Design & creative", "Food & café", "Beauty", "Career & business"], custom: "Or describe it in your words" },
  { key: "goal", q: "What is your main goal?", options: ["Get clients", "Sell my services", "Grow my business", "Get a better job"] },
  { key: "audience", q: "Who is your dream audience?", input: "text", placeholder: "e.g. busy moms 30–40 who want to eat healthier" },
  { key: "platform", q: "Where will you post first?", options: ["Instagram Reels", "YouTube Shorts", "TikTok"] },
  { key: "minutes", q: "How much time per day can you give?", options: ["10", "20", "30", "60"], suffix: " min" },
  { key: "camera", q: "How do you feel about the camera?", options: ["Scared, I'd rather not show my face", "A bit nervous", "Comfortable"] },
];

export default function Quiz() {
  const [s, update] = useAura();
  const router = useRouter();
  const [i, setI] = useState(0);
  const [a, setA] = useState({});
  if (!s) return <Loading />;
  const step = STEPS[i];
  const val = a[step.key] || "";
  const set = (v) => setA({ ...a, [step.key]: v });
  const next = () => {
    if (i < STEPS.length - 1) return setI(i + 1);
    update((st) => ({ ...st, profile: a }));
    router.push("/avatar");
  };

  return (
    <div className="wrap" style={{ minHeight: "100vh" }}>
      <header className="header">
        <Link href="/" aria-label="Aura home"><Logo /></Link>
        <div className="row small" style={{ fontWeight: 600 }}>
          Question {i + 1} of {STEPS.length}
          <div className="bar" style={{ width: 240 }}><div style={{ width: `${((i + 1) / STEPS.length) * 100}%` }} /></div>
        </div>
        <Link className="chip" href="/">Exit</Link>
      </header>

      <main className="card col" style={{ gap: 24, maxWidth: 820, width: "100%", margin: "0 auto", padding: 44 }}>
        <span className="pill">Step {i + 1}</span>
        <h1 style={{ fontSize: 44, lineHeight: 1.02 }}>{step.q}</h1>

        {step.options && (
          <div className="grid g3">
            {step.options.map((o) => (
              <button key={o} type="button" className={"choice" + (val === o ? " on" : "")} onClick={() => set(o)}>
                <strong>{o}{step.suffix || ""}</strong>
              </button>
            ))}
          </div>
        )}
        {(step.input || step.custom) && (
          <label className="field">{step.custom || "Your answer"}
            <input className="input" type={step.input === "number" ? "number" : "text"} min={step.input === "number" ? 18 : undefined} max={step.input === "number" ? 99 : undefined}
              placeholder={step.placeholder || "Type here"} value={step.options?.includes(val) ? "" : val} onChange={(e) => set(e.target.value)} />
          </label>
        )}

        <div className="row" style={{ justifyContent: "space-between", marginTop: 12 }}>
          {i > 0 ? <button type="button" className="btn light" onClick={() => setI(i - 1)}>Back</button> : <Link className="btn light" href="/">Back</Link>}
          <button type="button" className="btn" disabled={!String(val).trim()} onClick={next}>{i === STEPS.length - 1 ? "Meet my avatar" : "Next"}</button>
        </div>
      </main>
    </div>
  );
}
