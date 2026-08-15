import IncidentsView from "@/components/views/IncidentsView";
import type { IncidentPriority } from "@/lib/types";

const VALID_PRIORITIES: IncidentPriority[] = ["red", "yellow", "green"];

export default async function Page({ params }: { params: Promise<{ priority: string }> }) {
  const { priority } = await params;
  const priorityFilter = VALID_PRIORITIES.includes(priority as IncidentPriority)
    ? (priority as IncidentPriority)
    : undefined;
  return <IncidentsView priorityFilter={priorityFilter} />;
}
