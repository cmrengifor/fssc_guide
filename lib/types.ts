export type Lang = "es" | "en";

export interface GlossaryTerm {
  term_es: string;
  term_en: string;
  def_es: string;
  def_en: string;
}

export interface FlowNodeWIStepRef {
  wiId: string;
  step: number;
}

export interface FlowNode {
  id: string;
  /** Keyed by region id (DATA.wiRegions[].id, e.g. "us"/"ca"/"nam"). No entry for the
   *  active region => node renders as pending (dashed, non-clickable) for that region. */
  wiStepRefByRegion?: Record<string, FlowNodeWIStepRef>;
  label_es: string;
  label_en: string;
}

export interface FlowBranch {
  id: string;
  label_es: string;
  label_en: string;
  /** Linear sequence of FlowNode ids rendered with .flow-arrow between them. */
  chain: string[];
}

/** A chain item is either a plain FlowNode id, or an inline decision that renders via
 *  .flow-decision + .flow-branches and then rejoins the outer chain afterward. */
export type FlowChainItem = string | { decision: string; branches: FlowBranch[] };

export function isFlowDecisionItem(
  item: FlowChainItem
): item is { decision: string; branches: FlowBranch[] } {
  return typeof item !== "string";
}

/** Describes one diagram's shape: a sequence of nodes and/or inline decisions, rendered
 *  entirely with the existing .flow-* CSS classes (no swimlanes, no arbitrary graphs). */
export interface FlowDiagram {
  id: string;
  title_es?: string;
  title_en?: string;
  /** Region ids (DATA.wiRegions[].id) this diagram represents. Selects which diagram
   *  a region-scoped /flow/region/<id> page shows; omitted on the app's default/primary diagram. */
  regions?: string[];
  chain: FlowChainItem[];
}

export interface WIRegion {
  id: string;
  name_es: string;
  name_en: string;
}

export interface WICategory {
  id: string;
  name_es: string;
  name_en: string;
}

export interface WorkInstruction {
  id: string;
  region: string;
  category: string;
  sourceDoc: string;
  tags: string[];
  images: string[][];
  title_en: string;
  title_es: string;
  objective_en: string;
  objective_es: string;
  steps_en: string[];
  steps_es?: string[];
  /** Optional, sparse: recurring gotchas/reminders grounded in this WI's own step text.
   *  Rendered as a callout above the steps list; most WIs won't have this. */
  tips_en?: string[];
  tips_es?: string[];
}

export interface GuideData {
  glossary: GlossaryTerm[];
  flow: { diagrams: FlowDiagram[]; nodes: FlowNode[] };
  /** Keyed by region id (DATA.wiRegions[].id). Curated, ordered onboarding sequence of
   *  real Work Instruction ids for that region — not the full catalog, a suggested subset. */
  learningPath: Record<string, string[]>;
  workInstructions: WorkInstruction[];
  wiRegions: WIRegion[];
  wiCategories: WICategory[];
}

export interface UIText {
  [key: string]: string;
}

export interface UIDict {
  es: UIText;
  en: UIText;
}
