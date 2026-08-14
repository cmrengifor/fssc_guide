import detailsRaw from "@/data/wi-details.json";
import type { WorkInstructionDetail } from "@/lib/types";

const WI_DETAILS = detailsRaw as unknown as Record<string, WorkInstructionDetail>;

/** Only import this from the WI detail page — every other view needs just the
 *  light `WorkInstruction` slice already in `DATA.workInstructions`. Keeping
 *  this a separate module (not re-exported from lib/data.ts) is what lets
 *  Next.js scope the ~575KB of step/image/tip content to that one route's
 *  bundle instead of every route that imports lib/data.ts. */
export function getWIDetail(id: string): WorkInstructionDetail | undefined {
  return WI_DETAILS[id];
}
