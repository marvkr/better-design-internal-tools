import Link from "next/link";
import { flows } from "@/benchmark/flows";
import type { BenchmarkFlow } from "@/benchmark/types";
import { ArrowRightIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function FlowCard({ flow, index }: { flow: BenchmarkFlow; index: number }) {
  return (
    <Card className="flex min-h-64 flex-col">
      <CardHeader>
        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
          <Badge variant="outline">{flow.category}</Badge>
        </div>
        <CardTitle className="text-xl">{flow.name}</CardTitle>
        <CardDescription className="leading-6">{flow.job}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <p className="text-xs text-muted-foreground">For {flow.audience.toLowerCase()}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/flows/${flow.slug}`}>Open flow<ArrowRightIcon aria-hidden="true" className="size-4" /></Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground sm:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col items-start justify-between gap-6 border-b border-border pb-10 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Internal tool flows</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
              Fifteen reusable workflows for teams that build their own software.
            </p>
          </div>
          <Badge size="lg" variant="secondary">{flows.length} flows</Badge>
        </header>

        <section aria-label="Available internal tool flows" className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {flows.map((flow, index) => (
            <FlowCard flow={flow} index={index} key={flow.slug} />
          ))}
        </section>
      </div>
    </main>
  );
}
