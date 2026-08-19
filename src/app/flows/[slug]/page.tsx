import { notFound } from "next/navigation";
import { flowBySlug, flows } from "@/benchmark/flows";
import { FlowShell } from "@/components/flow-shell";

export function generateStaticParams() {
  return flows.map((flow) => ({ slug: flow.slug }));
}

export default async function FlowPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const flow = flowBySlug.get(slug);

  if (!flow) notFound();

  return <FlowShell flow={flow} />;
}
