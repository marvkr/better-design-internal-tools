/* eslint-disable react-hooks/refs */
"use client";
import { OnboardingStepper } from "@/components/ui/ix-onboarding-stepper";
import benchmarkFixture from "../../benchmark/fixture.json";

import { useRef, useState, type RefObject } from "react";
import { ArrowLeftIcon, ChartLineIcon, CheckmarkFilledIcon, ChevronRightIcon, DashboardIcon, DataTableIcon, HomeIcon, ResetIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const navItems = [["Home", HomeIcon], ["Charts", ChartLineIcon], ["Dashboards", DashboardIcon], ["Data", DataTableIcon]] as const;
const stats = [["Activation", "38.4%"], ["Weekly users", "18.2k"], ["Tracked events", "64"]];
const records = [["Workspace activation", "4-step funnel", "Updated today", "38.4%"], ["Invite conversion", "3-step funnel", "Updated yesterday", "62.1%"], ["Report retention", "Weekly cohort", "Updated 12 Aug", "44.8%"]];
const steps = [["Charts", "Track activation, retention, and the paths users take."], ["Define the funnel", "Choose the events that make up workspace activation."], ["Review inputs", "Check the funnel name, events, and date range."], ["Chart saved", "Workspace activation is now visible on the Growth dashboard."]];

type FormValues = { name: string; step1: string; step2: string; dateRange: string; note: string };
type FieldKey = keyof Pick<FormValues, "name" | "step1" | "step2" | "dateRange">;
const initialValues: FormValues = { name: "", step1: "", step2: "", dateRange: "", note: "" };





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
  const [activeNav, setActiveNav] = useState("Charts");
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const fieldRefs = { name: useRef<HTMLInputElement>(null), step1: useRef<HTMLSelectElement>(null), step2: useRef<HTMLSelectElement>(null), dateRange: useRef<HTMLSelectElement>(null) };

  function update(key: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    if (key !== "note") setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate() {
    const nextErrors: Partial<Record<FieldKey, string>> = {};
    const messages: Record<FieldKey, string> = { name: "Enter a chart name.", step1: "Choose the first event.", step2: "Choose the second event.", dateRange: "Choose a date range." };
    (Object.keys(messages) as FieldKey[]).forEach((key) => { if (!values[key].trim()) nextErrors[key] = messages[key]; });
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(messages) as FieldKey[]).find((key) => nextErrors[key]);
    if (firstInvalid) { fieldRefs[firstInvalid].current?.focus(); return false; }
    return true;
  }

  function reset() { setValues(initialValues); setErrors({}); setStep(0); setActiveNav("Charts"); }
  const progress = [25, 50, 75, 100][step];

  return <div className="min-h-screen bg-background text-foreground"><a href="#main-content" className="skip-link">Skip to content</a><div className="mx-auto flex min-h-screen max-w-[1600px]">
    <aside className="hidden w-60 shrink-0 border-r border-border bg-card/70 p-5 lg:flex lg:flex-col" aria-label="Primary navigation"><button type="button" className="mb-9 flex min-h-11 items-center gap-3 text-left text-lg font-semibold tracking-tight" onClick={reset} aria-label="Signal home, reset funnel workflow"><span className="grid size-9 place-items-center rounded-lg border border-[var(--gauge-rim)] bg-primary text-primary-foreground shadow-[var(--shadow-primary)]"><ChartLineIcon className="size-5" /></span><span>Signal</span></button><nav className="space-y-1">{navItems.map(([label, Icon]) => <button key={label} type="button" onClick={() => setActiveNav(label)} className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm transition-colors ${activeNav === label ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`} aria-current={activeNav === label ? "page" : undefined}><Icon className="size-4" />{label}</button>)}</nav><div className="mt-auto border-t border-border pt-4 text-sm text-muted-foreground"><p className="font-medium text-foreground">Product analytics</p><p className="mt-1">Growth workspace</p></div></aside>
    <main id="main-content" className="min-w-0 flex-1"><header className="border-b border-border bg-card/45 px-4 py-4 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4"><div className="flex items-center gap-3 lg:hidden"><span className="grid size-9 place-items-center rounded-lg border border-[var(--gauge-rim)] bg-primary text-primary-foreground"><ChartLineIcon className="size-5" /></span><span className="font-semibold">Signal</span></div><p className="hidden text-sm text-muted-foreground lg:block">{activeNav} <span className="mx-2 text-border">/</span> Funnel report</p><div className="ml-auto flex items-center gap-3"><span className="hidden text-sm text-muted-foreground sm:inline">Growth workspace</span><span className="grid size-9 place-items-center rounded-full bg-secondary text-sm font-semibold text-foreground" aria-label="Signed in as MK">MK</span></div></div></header>
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-8 sm:py-10 lg:px-12">{step === 0 && <Overview onStart={() => setStep(1)} />}{step === 1 && <DataEntry values={values} errors={errors} refs={fieldRefs} onChange={update} onBack={() => setStep(0)} onNext={() => validate() && setStep(2)} />}{step === 2 && <Review values={values} onBack={() => setStep(1)} onSave={() => setStep(3)} />}{step === 3 && <Completion values={values} onReset={reset} />}<><BenchmarkStepper currentStep={step} onStepChange={(nextStep) => setStep(nextStep as typeof step)} /><div className="hidden" aria-hidden="true"><div className="mt-10 border-t border-border pt-6"><div className="mb-3 flex items-center justify-between text-xs text-muted-foreground"><span>Funnel report workflow</span><span>Step {step + 1} of 4</span></div><Progress value={progress} aria-label={`Step ${step + 1} of 4`} className="h-1.5" /><nav aria-label="Funnel workflow progress" className="mt-4 grid grid-cols-4 gap-2">{steps.map(([title], index) => <button key={title} type="button" disabled={index > step} onClick={() => index <= step && setStep(index)} className={`min-h-11 text-left text-xs transition-colors ${index === step ? "font-semibold text-primary" : index < step ? "text-foreground underline underline-offset-4" : "text-muted-foreground"}`} aria-current={index === step ? "step" : undefined}>{index + 1}. {title}</button>)}</nav></div></div></></div></main>
  </div></div>;
}

function Overview({ onStart }: { onStart: () => void }) { return <section aria-labelledby="overview-title"><div className="mb-8 flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between"><div><h1 id="overview-title" className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Charts</h1><p className="mt-2 max-w-xl text-base text-muted-foreground">Track activation, retention, and the paths users take.</p></div><Button size="lg" onClick={onStart}><ChartLineIcon />Create chart<ChevronRightIcon /></Button></div><div className="grid gap-3 sm:grid-cols-3">{stats.map(([label, value]) => <Card key={label}><CardContent className="p-4"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 font-mono text-2xl font-semibold text-primary">{value}</p></CardContent></Card>)}</div><div className="mt-8"><div className="mb-3 flex items-center justify-between"><h2 className="text-xl font-semibold">Saved reports</h2><Badge variant="outline">3 reports</Badge></div><div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-panel)]">{records.map(([title, detail, meta, status], index) => <div key={title} className={`flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between ${index ? "border-t border-border" : ""}`}><div><p className="font-medium">{title}</p><p className="mt-1 text-sm text-muted-foreground">{detail} <span className="mx-1 text-border">/</span> {meta}</p></div><Badge variant="success-light" className="w-fit font-mono">{status}</Badge></div>)}</div></div></section>; }

type FieldRefs = { name: RefObject<HTMLInputElement | null>; step1: RefObject<HTMLSelectElement | null>; step2: RefObject<HTMLSelectElement | null>; dateRange: RefObject<HTMLSelectElement | null> };
function DataEntry({ values, errors, refs, onChange, onBack, onNext }: { values: FormValues; errors: Partial<Record<FieldKey, string>>; refs: FieldRefs; onChange: (key: keyof FormValues, value: string) => void; onBack: () => void; onNext: () => void }) {
  const fieldError = (key: FieldKey) => errors[key] ? <p id={`${key}-error`} className="mt-2 text-sm text-[oklch(0.78_0.14_25)]" role="alert">{errors[key]}</p> : null;
  return <section aria-labelledby="define-title" className="max-w-3xl"><button type="button" onClick={onBack} className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeftIcon className="size-4" />Back to charts</button><h1 id="define-title" className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Define the funnel</h1><p className="mt-2 text-base text-muted-foreground">Choose the events that make up workspace activation.</p><Card className="mt-8"><CardHeader><CardTitle>Funnel inputs</CardTitle><CardDescription>All fields are required to run this analysis.</CardDescription></CardHeader><CardContent><form onSubmit={(event) => { event.preventDefault(); onNext(); }} className="space-y-5" noValidate><div><label htmlFor="chart-name" className="text-sm font-medium">Chart name</label><Input ref={refs.name} id="chart-name" value={values.name} onChange={(event) => onChange("name", event.target.value)} placeholder="Workspace activation" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className="mt-2 min-h-11 text-base" />{fieldError("name")}</div><div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="step-one" className="text-sm font-medium">Step 1</label><NativeSelect ref={refs.step1} id="step-one" value={values.step1} onChange={(event) => onChange("step1", event.target.value)} aria-invalid={Boolean(errors.step1)} aria-describedby={errors.step1 ? "step1-error" : undefined} className="mt-2 min-h-11 text-base"><option value="">Select an event</option><option>Signed up</option><option>Created workspace</option><option>Invited teammate</option></NativeSelect>{fieldError("step1")}</div><div><label htmlFor="step-two" className="text-sm font-medium">Step 2</label><NativeSelect ref={refs.step2} id="step-two" value={values.step2} onChange={(event) => onChange("step2", event.target.value)} aria-invalid={Boolean(errors.step2)} aria-describedby={errors.step2 ? "step2-error" : undefined} className="mt-2 min-h-11 text-base"><option value="">Select an event</option><option>Created workspace</option><option>Invited teammate</option><option>Published report</option></NativeSelect>{fieldError("step2")}</div></div><div><label htmlFor="date-range" className="text-sm font-medium">Date range</label><NativeSelect ref={refs.dateRange} id="date-range" value={values.dateRange} onChange={(event) => onChange("dateRange", event.target.value)} aria-invalid={Boolean(errors.dateRange)} aria-describedby={errors.dateRange ? "dateRange-error" : undefined} className="mt-2 min-h-11 text-base"><option value="">Select a range</option><option>Last 7 days</option><option>Last 30 days</option><option>Last quarter</option></NativeSelect>{fieldError("dateRange")}</div><div><label htmlFor="internal-note" className="text-sm font-medium">Internal note <span className="font-normal text-muted-foreground">(optional)</span></label><Textarea id="internal-note" value={values.note} onChange={(event) => onChange("note", event.target.value)} placeholder="Add context for teammates" className="mt-2 min-h-24 text-base" /></div><div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end"><Button type="button" variant="outline" onClick={onBack} className="min-h-11">Back</Button><Button type="submit" size="lg" className="min-h-11">Run analysis<ChevronRightIcon /></Button></div></form></CardContent></Card></section>;
}

function Review({ values, onBack, onSave }: { values: FormValues; onBack: () => void; onSave: () => void }) { const rows = [["Chart name", values.name], ["Step 1", values.step1], ["Step 2", values.step2], ["Date range", values.dateRange]]; return <section aria-labelledby="review-title" className="max-w-3xl"><button type="button" onClick={onBack} className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeftIcon className="size-4" />Back to inputs</button><h1 id="review-title" className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Review inputs</h1><p className="mt-2 text-base text-muted-foreground">Check the funnel name, events, and date range.</p><Card className="mt-8"><CardHeader><div className="flex items-center justify-between gap-3"><div><CardTitle>Workspace activation</CardTitle><CardDescription className="mt-2">Ready to save to the Growth dashboard.</CardDescription></div><Badge variant="success-light">Ready</Badge></div></CardHeader><CardContent><dl className="divide-y divide-border rounded-lg border border-border">{rows.map(([label, value]) => <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4"><dt className="text-sm text-muted-foreground">{label}</dt><dd className="font-medium">{value}</dd></div>)}</dl>{values.note && <div className="mt-5 rounded-lg bg-secondary/60 p-4"><p className="text-sm text-muted-foreground">Internal note</p><p className="mt-1 whitespace-pre-wrap text-sm">{values.note}</p></div>}<div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="outline" onClick={onBack} className="min-h-11">Edit inputs</Button><Button type="button" size="lg" onClick={onSave} className="min-h-11">Save to dashboard<ChevronRightIcon /></Button></div></CardContent></Card></section>; }

function Completion({ values, onReset }: { values: FormValues; onReset: () => void }) { return <section aria-labelledby="complete-title" className="max-w-3xl"><Card className="overflow-hidden"><CardContent className="p-6 sm:p-10"><div className="grid size-14 place-items-center rounded-full bg-[var(--gauge-ok)] text-[oklch(0.2_0.05_152)]"><CheckmarkFilledIcon className="size-8" /></div><h1 id="complete-title" className="mt-7 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Chart saved</h1><p className="mt-2 max-w-xl text-base text-muted-foreground">{values.name || "Workspace activation"} is now visible on the Growth dashboard.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button size="lg" onClick={() => window.alert("Dashboard view is ready in Signal.")}>View dashboard<DashboardIcon /></Button><Button size="lg" variant="outline" onClick={onReset}><ResetIcon />Create another chart</Button></div></CardContent></Card></section>; }
