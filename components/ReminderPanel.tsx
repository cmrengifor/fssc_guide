"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { useProgress } from "@/lib/progress-context";
import { DATA } from "@/lib/data";

function nextIncompleteStep(doneSteps: number[], total: number): number {
  for (let step = 1; step <= total; step++) {
    if (!doneSteps.includes(step)) return step;
  }
  return total;
}

export default function ReminderPanel() {
  const { t, tf } = useLang();
  const { progressMap, lastVisited, hydrated } = useProgress();

  if (!hydrated) return null;

  const wiTotal = (id: string) => {
    const w = DATA.workInstructions.find((x) => x.id === id);
    return w ? (w.steps_es || w.steps_en).length : 0;
  };

  const continueWI = (() => {
    if (!lastVisited) return null;
    const w = DATA.workInstructions.find((x) => x.id === lastVisited.wiId);
    if (!w) return null;
    const total = wiTotal(w.id);
    const done = progressMap[w.id]?.length ?? 0;
    if (total === 0 || done >= total) return null;
    return { w, done, total, nextStep: nextIncompleteStep(progressMap[w.id] ?? [], total) };
  })();

  const pending = Object.keys(progressMap)
    .filter((wiId) => wiId !== continueWI?.w.id)
    .map((wiId) => {
      const w = DATA.workInstructions.find((x) => x.id === wiId);
      if (!w) return null;
      const total = wiTotal(wiId);
      const done = progressMap[wiId]?.length ?? 0;
      if (total === 0 || done === 0 || done >= total) return null;
      return { w, done, total };
    })
    .filter((x): x is { w: (typeof DATA.workInstructions)[number]; done: number; total: number } => !!x)
    .slice(0, 4);

  if (!continueWI && pending.length === 0) return null;

  return (
    <>
      {continueWI && (
        <div className="category-block">
          <h2 className="category-title">{t("reminderContinueTitle")}</h2>
          <Link href={`/wi/${continueWI.w.id}#step-${continueWI.nextStep}`} className="case-card">
            <div>
              <h3>{tf(continueWI.w, "title")}</h3>
            </div>
            <div className="case-card-trailing">
              <span className="progress-badge">
                {continueWI.done}/{continueWI.total}
              </span>
              <span className="chevron" aria-hidden="true">
                ›
              </span>
            </div>
          </Link>
        </div>
      )}
      {pending.length > 0 && (
        <div className="category-block">
          <h2 className="category-title">{t("reminderPendingTitle")}</h2>
          {pending.map(({ w, done, total }) => (
            <Link href={`/wi/${w.id}`} className="case-card" key={w.id}>
              <div>
                <h3>{tf(w, "title")}</h3>
              </div>
              <div className="case-card-trailing">
                <span className="progress-badge">
                  {done}/{total}
                </span>
                <span className="chevron" aria-hidden="true">
                  ›
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
