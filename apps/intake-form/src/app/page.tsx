"use client";
import { OnboardingStepper } from "@/components/ui/ix-onboarding-stepper";
import benchmarkFixture from "../../benchmark/fixture.json";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, ClipboardCheckIcon, CopyIcon, GroupIcon, HomeIcon, ListIcon, PlusIcon, RefreshIcon, SettingsIcon, WarningCircleIcon } from "@/components/icons";

const fields = [
  { id: "formName", label: "Form name", placeholder: "Creative request" },
  { id: "requestTitle", label: "Request title", placeholder: "What do you need?" },
  { id: "dueDateQuestion", label: "Due date question", placeholder: "When is this needed?" },
] as const;
const owners = ["Creative operations", "Finance", "Security"];
type FormValues = { formName: string; requestTitle: string; dueDateQuestion: string; owner: string; note: string };
const initialValues: FormValues = { formName: "", requestTitle: "", dueDateQuestion: "", owner: "", note: "" };
const records = [["Creative request", "Marketing", "42 responses"], ["New vendor", "Finance", "18 responses"], ["Data access", "Security", "86 responses"]];





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
  const [activeNav, setActiveNav] = useState("Forms");
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  function update(id: keyof FormValues, value: string) { setValues((current) => ({ ...current, [id]: value })); setErrors((current) => ({ ...current, [id]: undefined })); }
  function validate() {
    const next: Partial<Record<keyof FormValues, string>> = {};
    fields.forEach(({ id, label }) => { if (!values[id].trim()) next[id] = `${label} is required.`; });
    if (!values.owner) next.owner = "Owner is required.";
    setErrors(next);
    const first = fields.find(({ id }) => next[id]);
    if (first) setTimeout(() => document.getElementById(first.id)?.focus(), 0);
    return Object.keys(next).length === 0;
  }
  function nextStep() { if (step === 1 && !validate()) return; setStep((current) => Math.min(current + 1, 3)); }
  function reset() { setStep(0); setValues(initialValues); setErrors({}); }
  const stepTitles = ["Forms", "Build the form", "Review and publish", "Form published"];
  const stepDescriptions = ["Manage active intake forms and incoming work.", "Add the questions requesters must answer.", "Confirm ownership, response access, and the form link.", `${values.formName || "Your form"} is ready to share with the company.`];
  const nav = [["Forms", HomeIcon], ["Responses", ListIcon], ["Workspaces", GroupIcon], ["Settings", SettingsIcon]] as const;
  return <div className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border/70 bg-card"><div className="mx-auto flex min-h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10"><button onClick={() => setStep(0)} className="flex min-h-11 items-center gap-2 rounded-md text-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Go to Forms overview"><span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"><ClipboardCheckIcon className="size-5" /></span>Formline</button><div className="hidden items-center gap-2 text-sm font-medium md:flex"><span className="rounded-md bg-accent px-3 py-2 text-accent-foreground">Operations enablement</span><span className="text-muted-foreground">Internal workspace</span></div><button className="grid size-11 place-items-center rounded-md text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Open settings"><SettingsIcon className="size-5" /></button></div></header>
    <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row"><aside className="border-b border-border/70 bg-card lg:min-h-[calc(100vh-4rem)] lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r"><nav aria-label="Primary navigation" className="flex gap-1 overflow-x-auto p-3 lg:block lg:space-y-1 lg:p-5">{nav.map(([label, NavIcon]) => <button key={label} onClick={() => { setActiveNav(label); if (label === "Forms") setStep(0); }} className={`flex min-h-11 shrink-0 items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${activeNav === label ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`} aria-current={activeNav === label ? "page" : undefined}><NavIcon className="size-5" />{label}</button>)}</nav></aside>
      <main className="min-w-0 flex-1 px-4 py-7 sm:px-6 lg:px-10 lg:py-10"><div className="mx-auto max-w-5xl"><div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{stepTitles[step]}</h1><p className="mt-2 max-w-xl text-base text-muted-foreground">{stepDescriptions[step]}</p></div><><BenchmarkStepper currentStep={step} onStepChange={(nextStep) => setStep(nextStep as typeof step)} /><div className="hidden" aria-hidden="true"><div className="flex items-center gap-2" aria-label={`Step ${step + 1} of 4`}>{stepTitles.map((title, index) => <button key={title} onClick={() => index < step && setStep(index)} aria-label={`Step ${index + 1}: ${title}`} className={`flex size-9 items-center justify-center rounded-full border text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${index === step ? "border-primary bg-primary text-primary-foreground" : index < step ? "border-primary/30 bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>{index < step ? <CheckIcon className="size-4" /> : index + 1}</button>)}</div></div></></div>
        {step === 0 && <><div className="mb-8 grid gap-3 sm:grid-cols-3">{[["Active forms", "8"], ["Responses this week", "146"], ["Needs review", "19"]].map(([label, value]) => <Card key={label}><CardContent className="p-5"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p></CardContent></Card>)}</div><Card><CardHeader className="flex-row items-center justify-between"><div><CardTitle>Active forms</CardTitle><p className="mt-1 text-sm text-muted-foreground">Forms currently accepting internal requests.</p></div><Button onClick={() => setStep(1)} size="lg"><PlusIcon className="size-5" />Create form</Button></CardHeader><CardContent><div className="divide-y divide-border">{records.map(([title, detail, meta]) => <button key={title} onClick={() => setStep(1)} className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><div className="min-w-0"><p className="truncate font-medium">{title}</p><p className="text-sm text-muted-foreground">{detail}</p></div><div className="flex shrink-0 items-center gap-3"><span className="hidden text-sm text-muted-foreground sm:block">{meta}</span><Badge variant="secondary">Active</Badge><ArrowRightIcon className="size-4 text-muted-foreground" /></div></button>)}</div></CardContent></Card></>}
        {step === 1 && <Card><CardHeader><CardTitle className="text-xl">Form details</CardTitle><p className="text-sm text-muted-foreground">These fields become the requester-facing questions.</p></CardHeader><CardContent><form onSubmit={(event) => { event.preventDefault(); nextStep(); }} className="space-y-5">{fields.map(({ id, label, placeholder }) => <div key={id} className="space-y-2"><Label htmlFor={id}>{label}</Label><Input id={id} value={values[id]} onChange={(event) => update(id, event.target.value)} placeholder={placeholder} aria-invalid={Boolean(errors[id])} aria-describedby={errors[id] ? `${id}-error` : undefined} className="text-base" />{errors[id] && <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-destructive"><WarningCircleIcon className="size-4" />{errors[id]}</p>}</div>)}<div className="space-y-2"><Label htmlFor="owner">Owner</Label><Select value={values.owner} onValueChange={(value) => update("owner", value ?? "")}><SelectTrigger id="owner" aria-invalid={Boolean(errors.owner)} className="h-11 text-base"><SelectValue placeholder="Creative operations" /></SelectTrigger><SelectContent>{owners.map((owner) => <SelectItem key={owner} value={owner}>{owner}</SelectItem>)}</SelectContent></Select>{errors.owner && <p className="flex items-center gap-1.5 text-sm text-destructive"><WarningCircleIcon className="size-4" />{errors.owner}</p>}</div><div className="space-y-2"><Label htmlFor="note">Internal note <span className="font-normal text-muted-foreground">(optional)</span></Label><Textarea id="note" value={values.note} onChange={(event) => update("note", event.target.value)} placeholder="Add context for the team managing this form" className="min-h-24 text-base" /></div><div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between"><Button type="button" variant="outline" onClick={() => setStep(0)} size="lg"><ArrowLeftIcon className="size-5" />Back</Button><Button type="submit" size="lg">Set routing<ArrowRightIcon className="size-5" /></Button></div></form></CardContent></Card>}
        {step === 2 && <Card><CardHeader><CardTitle className="text-xl">Check before publishing</CardTitle><p className="text-sm text-muted-foreground">Review the requester experience and ownership details.</p></CardHeader><CardContent><dl className="divide-y divide-border">{[["Form name", values.formName], ["Request title", values.requestTitle], ["Due date question", values.dueDateQuestion], ["Owner", values.owner], ["Internal note", values.note || "No internal note added"]].map(([label, value]) => <div key={label} className="grid gap-1 py-4 sm:grid-cols-[minmax(10rem,0.5fr)_1fr]"><dt className="text-sm text-muted-foreground">{label}</dt><dd className="font-medium">{value}</dd></div>)}</dl><div className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between"><Button variant="outline" onClick={() => setStep(1)} size="lg"><ArrowLeftIcon className="size-5" />Edit form</Button><Button onClick={nextStep} size="lg"><ClipboardCheckIcon className="size-5" />Publish form</Button></div></CardContent></Card>}
        {step === 3 && <Card><CardContent className="flex flex-col items-center px-5 py-12 text-center sm:px-10"><div className="mb-5 grid size-14 place-items-center rounded-full bg-primary/10 text-primary"><CheckIcon className="size-7" /></div><h2 className="text-2xl font-semibold tracking-tight">Form published</h2><p className="mt-2 max-w-md text-muted-foreground">{values.formName} is ready to share with the company.</p><div className="mt-7 flex w-full max-w-lg items-center gap-2 rounded-md border border-border bg-muted/50 p-2 text-left"><span className="min-w-0 flex-1 truncate px-2 font-mono text-sm text-muted-foreground">formline.company/forms/{values.formName.toLowerCase().replaceAll(" ", "-") || "creative-request"}</span><Button onClick={() => navigator.clipboard?.writeText(`https://formline.company/forms/${values.formName.toLowerCase().replaceAll(" ", "-") || "creative-request"}`)} variant="outline" size="lg"><CopyIcon className="size-5" />Copy form link</Button></div><Button onClick={reset} variant="ghost" className="mt-5" size="lg"><RefreshIcon className="size-5" />Create another form</Button></CardContent></Card>}
      </div></main>
    </div>
  </div>;
}
