import { DATA } from "@/lib/data";
import { slugify } from "@/lib/slug";
import type { Incident, IncidentPriority } from "@/lib/types";

export interface SearchIndexItem {
  type: "glossary" | "wi" | "incident";
  id?: string;
  label_es: string;
  label_en: string;
  tags: string[];
  /** Only set for type "incident" — lets the result row show its priority color. */
  priority?: IncidentPriority;
}

function buildSearchIndex(): SearchIndexItem[] {
  const idx: SearchIndexItem[] = [];

  DATA.glossary.forEach((g) => {
    idx.push({
      type: "glossary",
      id: slugify(g.term_en),
      label_es: g.term_es,
      label_en: g.term_en,
      tags: [g.term_es, g.term_en, g.def_es, g.def_en],
    });
  });

  DATA.workInstructions.forEach((w) => {
    idx.push({
      type: "wi",
      id: w.id,
      label_es: w.title_es,
      label_en: w.title_en,
      tags: [...w.tags.flatMap((tag) => [tag.en, tag.es]), w.region],
    });
  });

  return idx;
}

export const SEARCH_INDEX = buildSearchIndex();

/** Incidents live in localStorage, not the static DATA this module indexes at load
 *  time — built on demand from live incident state instead of baked into SEARCH_INDEX. */
export function buildIncidentSearchItems(incidents: Incident[]): SearchIndexItem[] {
  return incidents.map((incident) => ({
    type: "incident",
    id: incident.id,
    label_es: incident.title_es,
    label_en: incident.title_en,
    tags: [incident.title_es, incident.title_en, incident.description_es, incident.description_en].filter(
      (s): s is string => !!s
    ),
    priority: incident.priority,
  }));
}
