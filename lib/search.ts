import { DATA } from "@/lib/data";
import { slugify } from "@/lib/slug";

export interface SearchIndexItem {
  type: "glossary" | "wi";
  id?: string;
  label_es: string;
  label_en: string;
  tags: string[];
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
