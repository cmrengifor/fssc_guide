import WIListView from "@/components/views/WIListView";

export default async function Page({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  return <WIListView regionFilter={region} />;
}
