"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

const STORAGE_KEY = "fssc-progress-v1";

interface LastVisited {
  wiId: string;
  ts: number;
}

interface StoredProgress {
  steps: Record<string, number[]>;
  lastVisited: LastVisited | null;
}

interface ProgressContextValue {
  hydrated: boolean;
  isStepDone: (wiId: string, step: number) => boolean;
  toggleStep: (wiId: string, step: number) => void;
  wiProgress: (wiId: string, total: number) => { done: number; total: number };
  markVisited: (wiId: string) => void;
  lastVisited: LastVisited | null;
  /** Raw completed-step indices per WI id. Consumers cross-reference against
   *  each WI's real step count (from DATA) to tell "in progress" from "complete". */
  progressMap: Record<string, number[]>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

function readStorage(): StoredProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { steps: {}, lastVisited: null };
    const parsed = JSON.parse(raw);
    return { steps: parsed.steps ?? {}, lastVisited: parsed.lastVisited ?? null };
  } catch {
    return { steps: {}, lastVisited: null };
  }
}

function writeStorage(data: StoredProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage disabled/unavailable (private browsing, quota) — degrade to in-memory only
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [steps, setSteps] = useState<Record<string, number[]>>({});
  const [lastVisited, setLastVisited] = useState<LastVisited | null>(null);

  useEffect(() => {
    const stored = readStorage();
    setSteps(stored.steps);
    setLastVisited(stored.lastVisited);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage({ steps, lastVisited });
  }, [hydrated, steps, lastVisited]);

  const value = useMemo<ProgressContextValue>(() => {
    const isStepDone = (wiId: string, step: number) => (steps[wiId] ?? []).includes(step);

    const toggleStep = (wiId: string, step: number) => {
      setSteps((prev) => {
        const current = prev[wiId] ?? [];
        const next = current.includes(step) ? current.filter((s) => s !== step) : [...current, step];
        return { ...prev, [wiId]: next };
      });
    };

    const wiProgress = (wiId: string, total: number) => ({ done: (steps[wiId] ?? []).length, total });

    const markVisited = (wiId: string) => {
      setLastVisited({ wiId, ts: Date.now() });
    };

    return { hydrated, isStepDone, toggleStep, wiProgress, markVisited, lastVisited, progressMap: steps };
  }, [hydrated, steps, lastVisited]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
