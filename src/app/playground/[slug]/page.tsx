import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import PlaygroundDetailHeader from "@/components/PlaygroundDetailHeader";
import PlaygroundDetailContent from "@/components/PlaygroundDetailContent";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function PlaygroundDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="relative min-h-screen bg-background">
      <PlaygroundDetailHeader project={project} />
      <PlaygroundDetailContent project={project} />
    </div>
  );
}
