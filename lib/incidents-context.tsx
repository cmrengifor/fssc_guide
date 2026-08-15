"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Incident, IncidentPriority, IncidentStatus } from "@/lib/types";

const STORAGE_KEY = "fssc-incidents-v1";

type NewIncidentInput = Pick<
  Incident,
  "title_es" | "title_en" | "description_es" | "description_en" | "priority" | "wiId"
>;

type IncidentPatch = Partial<
  Pick<
    Incident,
    | "title_es"
    | "title_en"
    | "description_es"
    | "description_en"
    | "priority"
    | "status"
    | "wiId"
    | "resolutionNotes_es"
    | "resolutionNotes_en"
  >
>;

interface IncidentsContextValue {
  hydrated: boolean;
  incidents: Incident[];
  createIncident: (input: NewIncidentInput) => void;
  updateIncident: (id: string, patch: IncidentPatch) => void;
  deleteIncident: (id: string) => void;
  countByPriority: (priority: IncidentPriority) => number;
}

const IncidentsContext = createContext<IncidentsContextValue | null>(null);

function readStorage(): Incident[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorage(incidents: Incident[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
  } catch {
    // storage disabled/unavailable (private browsing, quota) — degrade to in-memory only
  }
}

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `incident-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function IncidentsProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    setIncidents(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(incidents);
  }, [hydrated, incidents]);

  const value = useMemo<IncidentsContextValue>(() => {
    const createIncident = (input: NewIncidentInput) => {
      const now = new Date().toISOString();
      const incident: Incident = {
        id: newId(),
        ...input,
        status: "open",
        createdAt: now,
        updatedAt: now,
      };
      setIncidents((prev) => [incident, ...prev]);
    };

    const updateIncident = (id: string, patch: IncidentPatch) => {
      setIncidents((prev) =>
        prev.map((incident) => {
          if (incident.id !== id) return incident;
          const now = new Date().toISOString();
          return {
            ...incident,
            ...patch,
            updatedAt: now,
            resolvedAt: patch.status === "resolved" ? now : incident.resolvedAt,
          };
        })
      );
    };

    const deleteIncident = (id: string) => {
      setIncidents((prev) => prev.filter((incident) => incident.id !== id));
    };

    const countByPriority = (priority: IncidentPriority) =>
      incidents.filter((i) => i.priority === priority).length;

    return { hydrated, incidents, createIncident, updateIncident, deleteIncident, countByPriority };
  }, [hydrated, incidents]);

  return <IncidentsContext.Provider value={value}>{children}</IncidentsContext.Provider>;
}

export function useIncidents() {
  const ctx = useContext(IncidentsContext);
  if (!ctx) throw new Error("useIncidents must be used within an IncidentsProvider");
  return ctx;
}
