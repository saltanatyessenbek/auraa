"use client";
import { useEffect, useState, useCallback } from "react";
import { BLOCKS, LEVELS, LIFE_REFILL_DAYS } from "./content";

const KEY = "aura-state-v1";
const DAY = 24 * 60 * 60 * 1000;

export const initialState = () => ({
  profile: null,            // { role, age, niche, goal, audience, platform, minutes, camera }
  avatar: null,             // { char, name }
  xp: 0,
  lives: 3,
  livesEmptyAt: null,
  streak: 0,
  lastActiveDay: null,
  pro: false,
  completed: {},            // lessonId -> true
  answers: {},              // lessonId -> { fieldKey: value }
  stats: { hook: 1, clarity: 1, audience: 1, story: 1, trust: 1 },
  results: {},              // lessonId -> last evaluation
});

const today = () => new Date().toISOString().slice(0, 10);

function load() {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...initialState(), ...JSON.parse(raw) } : initialState();
  } catch {
    return initialState();
  }
}
function save(s) {
  try { window.localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
  window.dispatchEvent(new Event("aura-state"));
}

// Daily rules: streak, missed days cost a life, lives refill after 7 days.
function applyTime(s) {
  const t = today();
  let next = { ...s };
  if (next.livesEmptyAt && Date.now() - next.livesEmptyAt >= LIFE_REFILL_DAYS * DAY) {
    next.lives = 3; next.livesEmptyAt = null;
  }
  if (next.profile && next.lastActiveDay && next.lastActiveDay !== t) {
    const gap = Math.round((new Date(t) - new Date(next.lastActiveDay)) / DAY);
    if (gap >= 2) {
      next.streak = 0;
      if (next.lives > 0) {
        next.lives -= 1;
        if (next.lives === 0) next.livesEmptyAt = Date.now();
      }
    }
  }
  return next;
}

export function useAura() {
  const [state, setState] = useState(null);
  useEffect(() => {
    const s = applyTime(load());
    save(s);
    setState(s);
    const on = () => setState(load());
    window.addEventListener("aura-state", on);
    return () => window.removeEventListener("aura-state", on);
  }, []);
  const update = useCallback((fn) => {
    const cur = load();
    const next = typeof fn === "function" ? fn(cur) : { ...cur, ...fn };
    save(next);
    setState(next);
  }, []);
  return [state, update];
}

// Mark activity for streaks (call when a lesson step is done).
export function touch(s) {
  const t = today();
  if (s.lastActiveDay === t) return s;
  const yesterday = new Date(Date.now() - DAY).toISOString().slice(0, 10);
  return { ...s, lastActiveDay: t, streak: s.lastActiveDay === yesterday ? s.streak + 1 : 1 };
}

export function blockDone(s, block) {
  return block.lessons.length > 0 && block.lessons.every((l) => s.completed[l.id]);
}
export function levelOf(s) {
  let lvl = 1;
  for (const b of BLOCKS) { if (blockDone(s, b)) lvl = b.id + 1; else break; }
  return Math.min(lvl, 7);
}
export const levelInfo = (n) => LEVELS[Math.max(1, Math.min(7, n)) - 1];

// Block N opens at level N; blocks 3+ also need Pro.
export function blockStatus(s, block) {
  const lvl = levelOf(s);
  if (blockDone(s, block)) return "done";
  if (block.lessons.length === 0) return lvl >= block.id ? "soon" : "locked";
  if (lvl < block.id) return "locked";
  if (block.id >= 3 && !s.pro) return "pro";
  return "open";
}
export function nextLesson(s) {
  for (const b of BLOCKS) {
    if (blockStatus(s, b) !== "open") continue;
    const l = b.lessons.find((x) => !s.completed[x.id]);
    if (l) return l;
  }
  return null;
}
export function lessonOpen(s, lessonId) {
  for (const b of BLOCKS) {
    const i = b.lessons.findIndex((l) => l.id === lessonId);
    if (i === -1) continue;
    const st = blockStatus(s, b);
    if (st === "done") return true;
    if (st !== "open") return false;
    return b.lessons.slice(0, i).every((l) => s.completed[l.id]);
  }
  return false;
}

export function avatarSrc(s, sleeping) {
  const char = s?.avatar?.char || "bob";
  if (sleeping) return `/avatars/${char}-0-sleep.png`;
  return `/avatars/${char}-${levelInfo(levelOf(s)).file}.png`;
}

export function loseLife(s) {
  const lives = Math.max(0, s.lives - 1);
  return { ...s, lives, livesEmptyAt: lives === 0 ? Date.now() : s.livesEmptyAt };
}
export function refillIn(s) {
  if (!s.livesEmptyAt) return null;
  const ms = s.livesEmptyAt + LIFE_REFILL_DAYS * DAY - Date.now();
  const d = Math.floor(ms / DAY);
  const h = Math.floor((ms % DAY) / (60 * 60 * 1000));
  return `${d}d ${h}h`;
}
