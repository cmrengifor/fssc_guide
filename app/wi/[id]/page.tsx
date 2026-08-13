import WIDetailView from "@/components/views/WIDetailView";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <WIDetailView id={id} />;
}
