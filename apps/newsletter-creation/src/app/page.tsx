"use client";
import { OnboardingStepper } from "@/components/ui/ix-onboarding-stepper";
import benchmarkFixture from "../../benchmark/fixture.json";

import { useRef, useState } from "react";

import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, CheckIcon, HomeIcon, MailIcon, RefreshIcon } from "@/components/icons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const navItems = ["Overview", "Posts", "Audience", "Automations"] as const;
const audiences = ["Active subscribers", "Trial users", "Customers"] as const;
type FieldName = "subject" | "preview" | "audience" | "sendDate";
type FormValues = Record<FieldName, string> & { note: string };
const initialValues: FormValues = { subject: "", preview: "", audience: "", sendDate: "", note: "" };
const records = [
  { title: "August product update", detail: "Product news", meta: "Edited 8 min ago", status: "Draft" },
  { title: "Workflow templates", detail: "Education", meta: "Sent 12 Aug", status: "52% opened" },
  { title: "New pricing explained", detail: "Company news", meta: "Sent 4 Aug", status: "46% opened" },
];

function formatDate(value: string) {
  if (!value) return "Choose a date";
  return new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(`${value}T12:00:00`));
}





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
  const [activeNav, setActiveNav] = useState<(typeof navItems)[number]>("Posts");
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLElement | null>>>({});
  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (field in errors) setErrors((current) => ({ ...current, [field]: undefined }));
  };
  const validate = () => {
    const nextErrors: Partial<Record<FieldName, string>> = {};
    if (!values.subject.trim()) nextErrors.subject = "Enter a subject for this newsletter.";
    if (!values.preview.trim()) nextErrors.preview = "Add preview text so readers know what to expect.";
    if (!values.audience) nextErrors.audience = "Choose who should receive this newsletter.";
    if (!values.sendDate) nextErrors.sendDate = "Choose a send date for this newsletter.";
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) window.requestAnimationFrame(() => fieldRefs.current[firstInvalid]?.focus());
    return !firstInvalid;
  };
  const moveForward = () => {
    if (step === 1 && !validate()) return;
    setStep((current) => Math.min(current + 1, 3));
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  const reset = () => { setValues(initialValues); setErrors({}); setStep(0); setActiveNav("Posts"); window.scrollTo({ top: 0, behavior: "auto" }); };
  return <div className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border bg-card"><div className="mx-auto flex min-h-16 max-w-[1536px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
      <button className="flex min-h-11 items-center gap-2 rounded-md px-2 text-left text-lg font-medium tracking-[-0.03em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={reset} aria-label="Dispatch home"><span className="flex size-8 items-center justify-center rounded-[9px] bg-primary text-primary-foreground"><MailIcon className="size-[18px]" /></span>Dispatch</button>
      <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">{navItems.map((item) => <button key={item} onClick={() => setActiveNav(item)} className={`bd-hover-nav min-h-11 rounded-md px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${activeNav === item ? "bg-secondary font-medium text-foreground" : "text-muted-foreground"}`} aria-current={activeNav === item ? "page" : undefined}>{item}</button>)}</nav>
      <div className="flex items-center gap-2 text-sm text-muted-foreground"><span className="hidden sm:inline">Marketing operations</span><span className="flex size-9 items-center justify-center rounded-full bg-secondary font-medium text-foreground" aria-label="Lifecycle marketing team">LM</span></div>
    </div><nav aria-label="Mobile navigation" className="mx-auto flex max-w-[1536px] gap-1 overflow-x-auto px-4 pb-3 md:hidden">{navItems.map((item) => <button key={item} onClick={() => setActiveNav(item)} className={`min-h-11 shrink-0 rounded-md px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${activeNav === item ? "bg-secondary font-medium" : "text-muted-foreground"}`} aria-current={activeNav === item ? "page" : undefined}>{item}</button>)}</nav></header>
    <main className="mx-auto max-w-[1536px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">{activeNav !== "Posts" && step === 0 ? <section className="mx-auto max-w-2xl rounded-[14px] bg-card p-6 shadow-[var(--shadow-lift)] sm:p-8" aria-labelledby="section-title"><h1 id="section-title" className="text-2xl font-medium tracking-[-0.04em]">{activeNav}</h1><p className="mt-2 text-base leading-7 text-muted-foreground">This Dispatch workspace section is ready for your team.</p><Button className="mt-6" onClick={() => setActiveNav("Posts")}><MailIcon /> Open posts</Button></section> : <>
      <div className="mb-8 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-2xl"><h1 className="text-3xl font-medium tracking-[-0.05em] sm:text-4xl">{step === 0 ? "Posts" : step === 1 ? "Write the update" : step === 2 ? "Review and schedule" : "Post scheduled"}</h1><p className="mt-2 max-w-xl text-base leading-7 text-muted-foreground">{step === 0 ? "Manage drafts, scheduled sends, and published newsletters." : step === 1 ? "Set the subject, preview, and message for subscribers." : step === 2 ? "Check the audience and delivery time before publishing." : "The August update will reach 24,860 subscribers tomorrow."}</p></div>{step === 0 && <Button size="lg" className="px-6" onClick={() => setStep(1)}><MailIcon /> Create post</Button>}</div>
      {step === 0 && <Overview onCreate={() => setStep(1)} />}{step > 0 && <><BenchmarkStepper currentStep={step} onStepChange={(nextStep) => setStep(nextStep as typeof step)} /><div className="hidden" aria-hidden="true"><Progress step={step} onSelect={(nextStep) => { if (nextStep < step) setStep(nextStep); }} /></div></>}{step === 1 && <Editor values={values} errors={errors} updateValue={updateValue} fieldRefs={fieldRefs} />}{step === 2 && <Review values={values} />}{step === 3 && <Completion values={values} onReset={reset} />}
      {step > 0 && step < 3 && <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between"><Button variant="outline" size="lg" className="px-6" onClick={() => setStep((current) => current - 1)}><ArrowLeftIcon /> Back</Button><Button size="lg" className="px-6" onClick={moveForward}>{step === 1 ? "Preview post" : "Schedule post"}<ArrowRightIcon /></Button></div>}
    </>}</main>
  </div>;
}

function Overview({ onCreate }: { onCreate: () => void }) { return <div className="space-y-8"><section aria-label="Newsletter statistics" className="grid gap-4 sm:grid-cols-3">{[["Subscribers", "24,860"], ["Avg. open rate", "48%"], ["Drafts", "3"]].map(([label, value]) => <Card key={label}><CardContent className="p-4"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-3 text-2xl font-medium tracking-[-0.04em]">{value}</p></CardContent></Card>)}</section><Card><CardHeader><CardTitle>Recent posts</CardTitle><CardDescription>Keep track of the latest newsletter work.</CardDescription></CardHeader><CardContent className="space-y-1">{records.map((record) => <div key={record.title} className="bd-hover-row flex flex-col gap-3 rounded-[9px] p-3 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="font-medium">{record.title}</p><p className="mt-1 text-sm text-muted-foreground">{record.detail} <span className="mx-1 text-border">/</span> {record.meta}</p></div><Badge variant={record.status === "Draft" ? "secondary" : "outline"} className="w-fit">{record.status}</Badge></div>)}</CardContent></Card><div className="flex flex-col gap-3 rounded-[9px] bg-accent p-4 text-sm text-accent-foreground sm:flex-row sm:items-center"><div className="flex min-w-0 items-center gap-3"><HomeIcon className="size-5 shrink-0" /><p>Start a new post to draft the August product update.</p></div><Button variant="outline" size="lg" className="shrink-0 px-6" onClick={onCreate}>Create</Button></div></div>; }

function Progress({ step, onSelect }: { step: number; onSelect: (step: number) => void }) { const items = ["Posts", "Write the update", "Review and schedule", "Post scheduled"]; return <nav aria-label="Newsletter progress" className="mb-8 overflow-x-auto"><ol className="flex min-w-max items-center gap-2 sm:min-w-0 sm:gap-3">{items.map((item, index) => <li key={item} className="flex items-center gap-2 sm:flex-1 sm:last:flex-none"><button type="button" onClick={() => onSelect(index)} disabled={index >= step} aria-current={index === step ? "step" : undefined} className={`bd-hover-nav flex min-h-11 items-center gap-2 rounded-md px-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default ${index === step ? "font-medium text-foreground" : index < step ? "text-muted-foreground" : "text-muted-foreground"}`}><span className={`flex size-7 items-center justify-center rounded-full text-xs ${index < step ? "bg-secondary text-foreground" : index === step ? "bg-primary text-primary-foreground" : "border border-border"}`}>{index < step ? <CheckIcon className="size-4" /> : index + 1}</span><span className="hidden sm:inline">{item}</span></button>{index < items.length - 1 && <Separator className="hidden sm:block sm:flex-1" />}</li>)}</ol></nav>; }

function Editor({ values, errors, updateValue, fieldRefs }: { values: FormValues; errors: Partial<Record<FieldName, string>>; updateValue: (field: keyof FormValues, value: string) => void; fieldRefs: React.MutableRefObject<Partial<Record<FieldName, HTMLElement | null>>> }) { const field = (name: FieldName) => ({ ref: (element: HTMLElement | null) => { fieldRefs.current[name] = element; }, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${name}-error` : undefined }); return <Card><CardHeader><CardTitle>Newsletter details</CardTitle><CardDescription>All fields are required unless marked optional.</CardDescription></CardHeader><CardContent><form className="grid gap-6" onSubmit={(event) => event.preventDefault()}><div className="grid gap-6 md:grid-cols-2"><Field label="Subject" error={errors.subject} id="subject"><Input id="subject" {...field("subject")} value={values.subject} onChange={(event) => updateValue("subject", event.target.value)} placeholder="What shipped in August" required /></Field><Field label="Preview text" error={errors.preview} id="preview"><Input id="preview" {...field("preview")} value={values.preview} onChange={(event) => updateValue("preview", event.target.value)} placeholder="Faster reports, cleaner exports, and more" required /></Field><Field label="Audience" error={errors.audience} id="audience"><Select value={values.audience} onValueChange={(value) => updateValue("audience", value)}><SelectTrigger id="audience" {...field("audience")}><SelectValue placeholder="Active subscribers" /></SelectTrigger><SelectContent>{audiences.map((audience) => <SelectItem key={audience} value={audience}>{audience}</SelectItem>)}</SelectContent></Select></Field><Field label="Send date" error={errors.sendDate} id="sendDate"><div className="relative"><CalendarIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="sendDate" type="date" {...field("sendDate")} className="pl-10" value={values.sendDate} onChange={(event) => updateValue("sendDate", event.target.value)} required /></div></Field></div><Field label="Internal note" optional id="note"><Textarea id="note" value={values.note} onChange={(event) => updateValue("note", event.target.value)} placeholder="Add context for your team" rows={4} /></Field></form></CardContent></Card>; }

function Field({ label, optional, error, id, children }: { label: string; optional?: boolean; error?: string; id: string; children: React.ReactNode }) { return <div className="grid gap-2"><Label htmlFor={id}>{label}{optional && <span className="ml-1 font-normal text-muted-foreground">(optional)</span>}</Label>{children}{error && <p id={`${id}-error`} role="alert" className="text-sm text-destructive">{error}</p>}</div>; }

function Review({ values }: { values: FormValues }) { return <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"><Card><CardHeader><CardTitle>Check your post</CardTitle><CardDescription>Confirm the message details before scheduling it.</CardDescription></CardHeader><CardContent className="space-y-5"><dl className="space-y-5"><ReviewRow label="Subject" value={values.subject} /><ReviewRow label="Preview text" value={values.preview} /><ReviewRow label="Audience" value={values.audience} /><ReviewRow label="Send date" value={formatDate(values.sendDate)} />{values.note && <ReviewRow label="Internal note" value={values.note} />}</dl></CardContent></Card><Card className="h-fit"><CardHeader><CardTitle>Delivery summary</CardTitle></CardHeader><CardContent className="space-y-4 text-sm"><div className="flex items-center justify-between gap-4"><span className="text-muted-foreground">Recipients</span><span className="font-medium">24,860 subscribers</span></div><div className="flex items-center justify-between gap-4"><span className="text-muted-foreground">Status</span><Badge variant="secondary">Ready to schedule</Badge></div></CardContent></Card></div>; }
function ReviewRow({ label, value }: { label: string; value: string }) { return <div className="grid gap-1 border-b border-border pb-4 last:border-0 last:pb-0 sm:grid-cols-[140px_1fr]"><dt className="text-sm text-muted-foreground">{label}</dt><dd className="break-words text-base font-medium">{value}</dd></div>; }
function Completion({ values, onReset }: { values: FormValues; onReset: () => void }) { return <Card className="mx-auto max-w-2xl"><CardContent className="p-6 sm:p-10"><div className="flex size-12 items-center justify-center rounded-full bg-secondary text-foreground"><CheckIcon className="size-6" /></div><h2 className="mt-6 text-2xl font-medium tracking-[-0.04em]">Post scheduled</h2><p className="mt-2 text-base leading-7 text-muted-foreground">{values.subject || "The August update"} will reach 24,860 subscribers on {formatDate(values.sendDate)}.</p><Alert className="mt-6"><AlertDescription className="flex items-start gap-2"><CalendarIcon className="mt-1 size-4 shrink-0" />Scheduled for {formatDate(values.sendDate)} · {values.audience}</AlertDescription></Alert><Button variant="outline" size="lg" className="mt-8 px-6" onClick={onReset}><RefreshIcon /> Create another post</Button></CardContent></Card>; }
