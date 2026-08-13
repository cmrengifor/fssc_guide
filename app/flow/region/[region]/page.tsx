import FlowView from "@/components/views/FlowView";

export default async function Page({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  return <FlowView regionFilter={region} />;
}
