# Aura — Aurafarm. Be extra.

A personal brand trainer for experts who want clients. Built by **Team MaxiMax** for the Zimran Hackathon (track: Skills).

Users take a short quiz, pick an avatar and go through a course of 7 blocks. Every lesson has 7 steps:
Theory → Video → Key points → Practice → Simulation → AI feedback → Avatar progress.
An AI audience (future client, skeptic, beginner, expert, hater) reacts to every task. Score under 6/10 costs a life.
At 0 lives the avatar falls asleep for 7 days. Passing lessons earns XP and levels the avatar up from Noob to Pro.

## What is real
- **AI grading, AI audience, Hook Battle, comment defense, AI ideas and AI coach**: live LLM calls (`/api/*`).
- **Feed of real YouTube Shorts** from the user's niche and **tracking of any real Short**: YouTube Data API v3.
- **Progress, lives, streak, XP, levels**: saved in the browser (localStorage). No sign-up needed.
- **Payments are not connected** in this demo: "Refill lives" and "Activate Pro" work for free and are labeled "demo".

## Run locally
```bash
npm install
cp .env.example .env.local   # add your keys
npm run dev                  # http://localhost:3000
```

## Environment variables
| Name | Needed for |
|---|---|
| `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` | All AI features (one is enough) |
| `ANTHROPIC_MODEL` / `OPENAI_MODEL` | Optional model override |
| `YOUTUBE_API_KEY` | Real Shorts feed and "Track a Short" |

## Deploy (Vercel)
1. Push this repo to GitHub.
2. On vercel.com: **Add New → Project → Import** the repo.
3. Add the environment variables above, then **Deploy**.

## Structure
- `app/` pages: landing, quiz, avatar, course, lesson/[id], rest (0 lives), pro, coach, track
- `app/api/` server routes: evaluate, ideas, defend, coach, feed, stats
- `lib/content.js` course content (blocks 1–2 fully written, 3–7 announced)
- `lib/store.js` game logic: levels, lives, streaks, unlocking
- `lib/llm.js` Anthropic / OpenAI helper
- `public/avatars/` 3 characters × 8 states (7 levels + asleep)
