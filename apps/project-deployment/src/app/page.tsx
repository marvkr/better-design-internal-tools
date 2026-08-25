"use client";
import { OnboardingStepper } from "@/components/ui/ix-onboarding-stepper";
import benchmarkFixture from "../../benchmark/fixture.json";

import { useRef, useState, type MutableRefObject } from "react";
import { ActivityIcon, ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, GitIcon, GlobeIcon, LinkExternalIcon, PlusIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";

const navItems = ["Projects", "Deployments", "Domains", "Activity"];
const stats = [{ label: "Projects", value: "12" }, { label: "Deployments today", value: "28" }, { label: "Failed", value: "1" }];
const records = [
  { title: "customer-portal", detail: "main · a19fd2c", meta: "Ready · 6 min ago", status: "Production" },
  { title: "docs", detail: "main · 812ce1a", meta: "Ready · 42 min ago", status: "Production" },
  { title: "admin-console", detail: "fix/exports · d91b771", meta: "Failed · 1 hr ago", status: "Preview" },
];
const fields = [
  { key: "repository", label: "Repository", placeholder: "acme/customer-portal" },
  { key: "framework", label: "Framework", placeholder: "Select a framework", options: ["Next.js", "Vite", "Astro"] },
  { key: "root", label: "Root directory", placeholder: "./" },
  { key: "build", label: "Build command", placeholder: "bun run build" },
] as const;
type FormValues = { repository: string; framework: string; root: string; build: string; note: string };
type FieldErrors = Partial<Record<keyof FormValues, string>>;
const initialValues: FormValues = { repository: "", framework: "", root: "", build: "", note: "" };





function BenchmarkStepper({
  currentStep,
  onStepChange,
}: {
  currentStep: number;
  onStepChange: (step: number) => void;
}) {
  const benchmarkSteps = benchmarkFixture.steps.map((item, index) => ({
    id: String(index),
    label: item.title,
    title: item.title,
    description: item.description,
  }));

  return (
    <OnboardingStepper
      steps={benchmarkSteps}
      index={currentStep}
      onIndexChange={(nextStep) => {
        if (nextStep < currentStep) onStepChange(nextStep);
      }}
      progressStyle="segments"
      labelMode="current"
      progressLabel={benchmarkFixture.name + " progress"}
      className="mb-8 shadow-none [&>div:nth-of-type(2)]:hidden [&>div:last-child]:hidden"
    />
  );
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [selectedNav, setSelectedNav] = useState("Deployments");
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [visited, setVisited] = useState(false);
  const fieldRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | null>>({});
  function update(key: keyof FormValues, value: string) { setValues((current) => ({ ...current, [key]: value })); if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined })); }
  function validate() { const nextErrors: FieldErrors = {}; for (const field of fields) if (!values[field.key]) nextErrors[field.key] = `${field.label} is required.`; setErrors(nextErrors); const firstInvalid = fields.find((field) => nextErrors[field.key]); if (firstInvalid) fieldRefs.current[firstInvalid.key]?.focus(); return Object.keys(nextErrors).length === 0; }
  function reset() { setStep(0); setValues(initialValues); setErrors({}); setVisited(false); setSelectedNav("Deployments"); }
  return <div className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border bg-card"><div className="flex min-h-16 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"><button onClick={reset} className="flex min-h-11 items-center gap-2 rounded-md px-2 text-left font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Launchpad home"><span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground"><GitIcon className="size-4" /></span><span>Launchpad</span></button><div className="flex items-center gap-2 text-sm text-muted-foreground"><span className="hidden sm:inline">Developer operations</span><span className="size-2 rounded-full bg-success" aria-label="All systems operational" /></div></div></header>
    <div className="flex w-full flex-col lg:flex-row"><aside className="border-b border-border bg-card lg:min-h-[calc(100vh-4rem)] lg:w-60 lg:border-b-0 lg:border-r"><nav aria-label="Primary navigation" className="flex gap-1 overflow-x-auto p-3 lg:flex-col lg:p-4">{navItems.map((item) => <button key={item} onClick={() => setSelectedNav(item)} className={`min-h-11 shrink-0 whitespace-nowrap rounded-md px-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:w-full ${selectedNav === item ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>{item}</button>)}</nav><div className="hidden border-t border-border p-4 lg:block"><p className="text-xs text-muted-foreground">Workspace</p><p className="mt-1 font-mono text-sm">acme-team</p></div></aside>
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{selectedNav !== "Deployments" ? <Card className="mx-auto max-w-3xl"><CardHeader><CardTitle>{selectedNav}</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">{selectedNav} is available from the Launchpad workspace.</p><Button className="mt-6 min-h-11" onClick={() => setSelectedNav("Deployments")}>Back to deployments</Button></CardContent></Card> : <div className="mx-auto max-w-5xl"><div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Project deployment</h1><p className="mt-2 max-w-xl text-muted-foreground">Import a repository, configure the build, and deploy it to production.</p></div>{step === 0 && <Button className="min-h-11" onClick={() => setStep(1)}><PlusIcon className="size-4" />New project</Button>}</div>
        <><BenchmarkStepper currentStep={step} onStepChange={(nextStep) => setStep(nextStep as typeof step)} /><div className="hidden" aria-hidden="true"><ol aria-label="Deployment progress" className="mb-8 grid grid-cols-4 gap-2 sm:gap-4">{["Projects", "Import repository", "Review configuration", "Deployment ready"].map((title, index) => <li key={title} className={`min-w-0 border-t-2 pt-3 ${index <= step ? "border-primary" : "border-border"}`}><div className={`font-mono text-xs ${index <= step ? "text-foreground" : "text-muted-foreground"}`}>0{index + 1}</div><div className={`mt-1 break-words text-xs sm:text-sm ${index === step ? "font-semibold" : "text-muted-foreground"}`}>{title}</div></li>)}</ol></div></>
        {step === 0 && <Overview onStart={() => setStep(1)} />}{step === 1 && <ImportForm values={values} errors={errors} fieldRefs={fieldRefs} onChange={update} onBack={() => setStep(0)} onNext={() => { if (validate()) setStep(2); }} />}{step === 2 && <Review values={values} onBack={() => setStep(1)} onDeploy={() => setStep(3)} />}{step === 3 && <Complete visited={visited} onVisit={() => setVisited(true)} onReset={reset} />}
      </div>}</main>
    </div>
  </div>;
}

function Overview({ onStart }: { onStart: () => void }) { return <div className="space-y-8"><section aria-labelledby="workspace-overview"><div className="mb-3 flex items-center justify-between"><h2 id="workspace-overview" className="text-lg font-semibold">Workspace overview</h2><span className="font-mono text-xs text-muted-foreground">Updated just now</span></div><div className="grid gap-3 sm:grid-cols-3">{stats.map((stat) => <Card key={stat.label}><CardContent className="p-4"><p className="text-sm text-muted-foreground">{stat.label}</p><p className="mt-2 text-3xl font-semibold tracking-tight">{stat.value}</p></CardContent></Card>)}</div></section><section aria-labelledby="recent-deployments"><div className="mb-3 flex items-center justify-between"><h2 id="recent-deployments" className="text-lg font-semibold">Recent deployments</h2><ActivityIcon className="size-5 text-muted-foreground" /></div><Card><div className="divide-y divide-border">{records.map((record) => <div key={record.title} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-4"><div className="min-w-0"><p className="font-mono text-sm font-medium">{record.title}</p><p className="mt-1 text-sm text-muted-foreground">{record.detail}</p></div><div className="flex min-w-0 flex-wrap items-center justify-between gap-4 sm:justify-end"><span className="text-sm text-muted-foreground">{record.meta}</span><Badge variant={record.status === "Production" ? "success-light" : "warning-light"}>{record.status}</Badge></div></div>)}</div></Card></section><Card className="bg-secondary"><CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold">Ready to deploy a project?</h2><p className="mt-1 text-sm text-muted-foreground">Start with a repository and configure its production build.</p></div><Button className="min-h-11 shrink-0" onClick={onStart}>New project <ArrowRightIcon className="size-4" /></Button></CardContent></Card></div>; }

function ImportForm({ values, errors, fieldRefs, onChange, onBack, onNext }: { values: FormValues; errors: FieldErrors; fieldRefs: MutableRefObject<Record<string, HTMLInputElement | HTMLSelectElement | null>>; onChange: (key: keyof FormValues, value: string) => void; onBack: () => void; onNext: () => void }) { return <Card><CardHeader><CardTitle>Import repository</CardTitle><p className="text-sm text-muted-foreground">Choose the source repository and framework settings.</p></CardHeader><CardContent><form onSubmit={(event) => { event.preventDefault(); onNext(); }} noValidate className="space-y-4">{fields.map((field) => <div key={field.key} className="space-y-2"><Label htmlFor={`field-${field.key}`}>{field.label} <span className="text-destructive" aria-hidden="true">*</span></Label>{"options" in field ? <NativeSelect id={`field-${field.key}`} ref={(node) => { fieldRefs.current[field.key] = node; }} value={values[field.key]} onChange={(event) => onChange(field.key, event.target.value)} aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key] ? `error-${field.key}` : undefined} error={Boolean(errors[field.key])}><option value="">{field.placeholder}</option>{field.options.map((option) => <option key={option}>{option}</option>)}</NativeSelect> : <Input id={`field-${field.key}`} ref={(node) => { fieldRefs.current[field.key] = node; }} value={values[field.key]} onChange={(event) => onChange(field.key, event.target.value)} placeholder={field.placeholder} aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key] ? `error-${field.key}` : undefined} autoComplete={field.key === "repository" ? "url" : "off"} />}{errors[field.key] && <p id={`error-${field.key}`} className="text-sm text-destructive" role="alert">{errors[field.key]}</p>}</div>)}<div className="space-y-2"><Label htmlFor="internal-note">Internal note <span className="font-normal text-muted-foreground">(optional)</span></Label><Textarea id="internal-note" value={values.note} onChange={(event) => onChange("note", event.target.value)} placeholder="Add context for the deployment record" rows={3} /></div><div className="flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:justify-between"><Button type="button" variant="outline" className="min-h-11" onClick={onBack}><ArrowLeftIcon className="size-4" />Back</Button><Button type="submit" className="min-h-11">Review configuration <ArrowRightIcon className="size-4" /></Button></div></form></CardContent></Card>; }

function Review({ values, onBack, onDeploy }: { values: FormValues; onBack: () => void; onDeploy: () => void }) { return <Card><CardHeader><CardTitle>Review configuration</CardTitle><p className="text-sm text-muted-foreground">Confirm build settings and the deployment note before going live.</p></CardHeader><CardContent><dl className="divide-y divide-border rounded-md border border-border">{fields.map((field) => <div key={field.key} className="grid gap-1 p-4 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-4"><dt className="text-sm text-muted-foreground">{field.label}</dt><dd className="break-words font-mono text-sm">{values[field.key]}</dd></div>)}<div className="grid gap-1 p-4 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-4"><dt className="text-sm text-muted-foreground">Internal note</dt><dd className="whitespace-pre-wrap text-sm">{values.note || "No note added"}</dd></div></dl><div className="mt-4 flex items-start gap-3 rounded-md bg-secondary p-4 text-sm text-muted-foreground"><GlobeIcon className="mt-0.5 size-4 shrink-0" />Automatic HTTPS will be enabled for the production deployment.</div><div className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:justify-between"><Button variant="outline" className="min-h-11" onClick={onBack}><ArrowLeftIcon className="size-4" />Edit configuration</Button><Button className="min-h-11" onClick={onDeploy}>Deploy project <ArrowRightIcon className="size-4" /></Button></div></CardContent></Card>; }

function Complete({ visited, onVisit, onReset }: { visited: boolean; onVisit: () => void; onReset: () => void }) { return <Card><CardContent className="p-6 sm:p-10"><div className="flex size-12 items-center justify-center rounded-full bg-success-light text-success"><CheckCircleIcon className="size-7" /></div><h2 className="mt-6 text-2xl font-semibold tracking-tight">Deployment ready</h2><p className="mt-2 max-w-lg text-muted-foreground">customer-portal is live and protected by automatic HTTPS.</p><div className="mt-6 rounded-md border border-border bg-secondary p-4"><p className="text-sm text-muted-foreground">Production URL</p><p className="mt-1 break-all font-mono text-sm">https://customer-portal.launchpad.dev</p></div>{visited && <p className="mt-4 text-sm text-success" role="status">Deployment link opened.</p>}<div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button className="min-h-11" onClick={onVisit}><LinkExternalIcon className="size-4" />Visit deployment</Button><Button variant="outline" className="min-h-11" onClick={onReset}>Deploy another project</Button></div></CardContent></Card>; }
