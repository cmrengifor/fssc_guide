import LearningPathView from "@/components/views/LearningPathView";

export default async function Page({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  return <LearningPathView regionFilter={region} />;
}
