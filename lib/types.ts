export type Lang = "es" | "en";

export interface GlossaryTerm {
  term_es: string;
  term_en: string;
  def_es: string;
  def_en: string;
  /** Optional pointer to a fuller explanation living elsewhere in the app
   *  (e.g. Hold -> /holds), rendered as a small link under the definition. */
  seeAlsoHref?: string;
  seeAlsoLabel_es?: string;
  seeAlsoLabel_en?: string;
}

export type HoldCategory = "procurement" | "invoice-processing";

/** A specific Oracle hold code (e.g. "Qty Rec"). Distinct from the generic
 *  "Hold" glossary concept — this is the per-code breakdown that concept's
 *  definition points to. The code itself is never translated (same literal
 *  Oracle vocabulary in both languages), only its explanation is. */
export interface HoldType {
  id: string;
  code: string;
  category: HoldCategory;
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

export interface WorkInstructionTag {
  en: string;
  es: string;
}

/** The lightweight slice of a Work Instruction: identity, searchable metadata,
 *  and step COUNT (not the steps themselves) — everything list/card/progress
 *  UI needs without pulling in the heavy per-WI content. This is what ships in
 *  `DATA.workInstructions` and therefore in every client bundle that imports
 *  `lib/data.ts`. The actual steps/images/tips/objective live in
 *  `WorkInstructionDetail`, loaded only by the WI detail page — see `lib/wi-detail.ts`. */
export interface WorkInstruction {
  id: string;
  region: string;
  category: string;
  sourceDoc: string;
  tags: WorkInstructionTag[];
  title_en: string;
  title_es: string;
  /** Precomputed `(steps_es ?? steps_en).length` — avoids needing the heavy
   *  step content just to compute a progress denominator. */
  stepCount: number;
}

/** The heavy content for one Work Instruction, keyed by id in `data/wi-details.json`
 *  and loaded only via `getWIDetail()` — not part of `DATA`, so it never ships to
 *  routes that only need the light `WorkInstruction` slice above. */
export interface WorkInstructionDetail {
  images: string[][];
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
  holds: HoldType[];
}

export interface UIText {
  [key: string]: string;
}

export interface UIDict {
  es: UIText;
  en: UIText;
}

export type IncidentPriority = "red" | "yellow" | "green";
export type IncidentStatus = "open" | "in_progress" | "resolved";

/** A user-logged incident, persisted client-side (localStorage) — this app has no
 *  backend, so there is no server-issued id/timestamp; both are generated locally
 *  at creation time. Optionally links to a real Work Instruction via `wiId`. */
export interface Incident {
  id: string;
  title_es: string;
  title_en: string;
  description_es?: string;
  description_en?: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  wiId?: string;
  resolutionNotes_es?: string;
  resolutionNotes_en?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}
