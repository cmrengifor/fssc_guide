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
  type?: "decision" | "pending";
  caseId?: string;
  wiStepRef?: FlowNodeWIStepRef;
  label_es: string;
  label_en: string;
}

export interface CaseError {
  id: string;
  title_es: string;
  title_en: string;
  tags: string[];
  steps_es: string[];
  steps_en: string[];
}

export interface Case {
  id: string;
  category: string;
  title_es: string;
  title_en: string;
  tags: string[];
  steps_es: string[];
  steps_en: string[];
  checklist_es: string[];
  checklist_en: string[];
  errors: CaseError[];
}

export interface Category {
  id: string;
  name_es: string;
  name_en: string;
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
}

export interface GuideData {
  glossary: GlossaryTerm[];
  flow: { nodes: FlowNode[] };
  demoPath: string[];
  workInstructions: WorkInstruction[];
  flowchartImages: Record<string, string>;
  wiRegions: WIRegion[];
  wiCategories: WICategory[];
  categories: Category[];
  cases: Case[];
}

export interface UIText {
  [key: string]: string;
}

export interface UIDict {
  es: UIText;
  en: UIText;
}
