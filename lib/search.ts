import { DATA } from "@/lib/data";
import { slugify } from "@/lib/slug";
import type { Case } from "@/lib/types";

export interface SearchIndexItem {
  type: "case" | "error" | "glossary" | "wi";
  id?: string;
  label_es: string;
  label_en: string;
  tags: string[];
  parentCase?: Case;
}

function buildSearchIndex(): SearchIndexItem[] {
  const idx: SearchIndexItem[] = [];

  DATA.cases.forEach((c) => {
    idx.push({ type: "case", id: c.id, label_es: c.title_es, label_en: c.title_en, tags: c.tags });
    c.errors.forEach((e) => {
      idx.push({
        type: "error",
        id: c.id,
        label_es: e.title_es,
        label_en: e.title_en,
        tags: e.tags,
        parentCase: c,
      });
    });
  });

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
      tags: [...w.tags, w.region],
    });
  });

  return idx;
}

export const SEARCH_INDEX = buildSearchIndex();
