import rawData from "@/data/guide.json";
import uiText from "@/lib/ui-text.json";
import type { GuideData, UIDict } from "@/lib/types";

export const DATA = rawData as unknown as GuideData;
export const UI = uiText as unknown as UIDict;
