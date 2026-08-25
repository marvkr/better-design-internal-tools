"use client";
import { OnboardingStepper } from "@/components/ui/ix-onboarding-stepper";
import benchmarkFixture from "../../benchmark/fixture.json";
/* eslint-disable react-hooks/refs -- form refs are passed to controls and focused after validation. */

import { useRef, useState, type RefObject } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon, BookIcon, CheckIcon, GroupIcon, MessageIcon, NavArrowRightIcon } from "@/components/icons";

const nav = [{ name: "Inbox", Icon: MessageIcon }, { name: "Tickets", Icon: CheckIcon }, { name: "Customers", Icon: GroupIcon }, { name: "Knowledge", Icon: BookIcon }];
const stats = [["Unassigned", "18"], ["Waiting", "12"], ["SLA risk", "4"]];
const records = [
  ["Cannot export August report", "Ari from Mono", "Waiting 18 min", "SLA risk"],
  ["Add a second workspace", "Sam from Kanso", "Waiting 31 min", "Open"],
  ["Invoice address is wrong", "Jo from Vertex", "Waiting 42 min", "Open"],
];
const steps = [
  ["Support inbox", "Focus on conversations at risk of missing their response target."],
  ["Conversation", "Review the customer history and confirm the issue."],
  ["Send response", "Check the reply and selected conversation status."],
  ["Response sent", "Ari received the reply and the selected status was saved."],
];
type Values = { assignee: string; priority: string; reply: string; note: string; resolution: string };
type Errors = Partial<Record<keyof Values, string>>;
type RequiredField = Exclude<keyof Values, "note">;
const empty: Values = { assignee: "", priority: "", reply: "", note: "", resolution: "" };
type Refs = { assignee: RefObject<HTMLButtonElement | null>; priority: RefObject<HTMLButtonElement | null>; reply: RefObject<HTMLTextAreaElement | null>; resolution: RefObject<HTMLButtonElement | null> };





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
  const [step, setStep] = useState(0), [active, setActive] = useState("Inbox"), [values, setValues] = useState(empty), [errors, setErrors] = useState<Errors>({});
  const refs: Refs = { assignee: useRef(null), priority: useRef(null), reply: useRef(null), resolution: useRef(null) };
  const update = (key: keyof Values, value: string) => { setValues((v) => ({ ...v, [key]: value })); setErrors((e) => ({ ...e, [key]: undefined })); };
  const validate = (keys: Array<RequiredField>) => { const next: Errors = {}; keys.forEach((key) => { if (!values[key].trim()) next[key] = `${key[0].toUpperCase()}${key.slice(1)} is required.`; }); setErrors(next); const first = keys.find((key) => next[key]); if (first) window.setTimeout(() => refs[first].current?.focus(), 0); return !first; };
  const forward = () => { if (step === 0) setStep(1); else if (step === 1 && validate(["assignee", "priority", "reply"])) setStep(2); else if (step === 2 && validate(["resolution"])) setStep(3); };
  const reset = () => { setStep(0); setValues(empty); setErrors({}); };
  return <div className="min-h-screen bg-muted/40"><div className="flex min-h-screen">
    <aside className="hidden w-64 shrink-0 gap-4 border-r border-border bg-background lg:flex lg:flex-col" aria-label="Primary navigation"><div className="flex h-16 items-center gap-3 border-b px-6"><span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground"><MessageIcon className="size-5" /></span><span className="text-lg font-semibold">Harbor</span></div><nav className="space-y-1 p-4">{nav.map(({ name, Icon }) => <button key={name} type="button" onClick={() => setActive(name)} aria-current={active === name ? "page" : undefined} className={`flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active === name ? "bg-accent" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}><Icon className="size-5" />{name}</button>)}</nav><div className="border-t p-4 text-sm text-muted-foreground">Customer operations</div></aside>
    <div className="min-w-0 flex-1"><header className="flex min-h-16 items-center justify-between border-b bg-background px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-3 lg:hidden"><span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground"><MessageIcon className="size-5" /></span><span className="font-semibold">Harbor</span></div><span className="hidden text-sm text-muted-foreground lg:block">{active}</span><span className="flex size-8 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary" aria-label="Signed in as you">Y</span></header><nav className="grid grid-cols-2 gap-1 border-b bg-background px-3 py-2 sm:flex sm:overflow-x-auto lg:hidden" aria-label="Section navigation">{nav.map(({ name, Icon }) => <button key={name} type="button" onClick={() => setActive(name)} aria-current={active === name ? "page" : undefined} className={`flex min-h-11 min-w-0 items-center gap-2 rounded-md px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active === name ? "bg-accent" : "text-muted-foreground"}`}><Icon className="size-4 shrink-0" />{name}</button>)}</nav>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8"><div className="mb-6 flex items-start justify-between gap-4"><div><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{steps[step][0]}</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{steps[step][1]}</p></div>{step > 0 && step < 3 ? <Button variant="ghost" className="min-h-11 shrink-0" onClick={() => setStep(step - 1)}><ArrowLeftIcon className="size-4" />Back</Button> : null}</div>
        <><BenchmarkStepper currentStep={step} onStepChange={(nextStep) => setStep(nextStep as typeof step)} /><div className="hidden" aria-hidden="true"><nav aria-label="Triage progress" className="mb-8 w-full min-w-0 overflow-hidden pb-1"><ol className="flex w-full min-w-0 items-center">{steps.map((item, i) => <li key={item[0]} className="flex min-w-0 flex-1 items-center last:flex-none"><button type="button" disabled={i > step} onClick={() => i <= step && setStep(i)} aria-current={i === step ? "step" : undefined} className="flex min-h-11 min-w-0 items-center gap-2 rounded-md px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${i < step ? "border-primary bg-primary text-primary-foreground" : i === step ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>{i < step ? <CheckIcon className="size-4" /> : i + 1}</span><span className="hidden truncate sm:inline">{item[0]}</span></button>{i < 3 ? <span className="mx-2 h-px min-w-0 flex-1 bg-border" /> : null}</li>)}</ol></nav></div></>
        {step === 0 ? <Overview onOpen={forward} /> : step === 1 ? <Conversation values={values} errors={errors} refs={refs} update={update} onContinue={forward} /> : step === 2 ? <Review values={values} errors={errors} refs={refs} update={update} onBack={() => setStep(1)} onSend={forward} /> : <Completion values={values} onReset={reset} />}
      </main></div></div></div>;
}

function Overview({ onOpen }: { onOpen: () => void }) { return <div className="space-y-6"><div className="grid gap-3 sm:grid-cols-3">{stats.map(([label, value]) => <Card key={label}><CardContent className="p-4"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-3xl font-semibold">{value}</p></CardContent></Card>)}</div><Card><CardHeader className="space-y-2 border-b pb-4"><CardTitle className="text-lg">Conversations needing attention</CardTitle><CardDescription>Start with the oldest SLA risk.</CardDescription></CardHeader><CardContent className="p-0">{records.map(([title, detail, meta, status], i) => <div key={title} className={`flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between ${i < 2 ? "border-b" : ""}`}><div><div className="flex flex-wrap items-center gap-2"><p className="font-medium">{title}</p><Badge variant={status === "SLA risk" ? "destructive" : "secondary"}>{status}</Badge></div><p className="mt-1 text-sm text-muted-foreground"><span className="font-medium text-foreground">{meta}</span>, {detail}</p></div>{i === 0 ? <Button onClick={onOpen} className="min-h-11 w-full sm:w-auto">Open conversation<NavArrowRightIcon className="size-4" /></Button> : null}</div>)}</CardContent></Card></div>; }

function ErrorText({ message, id }: { message?: string; id: string }) { return message ? <p id={id} role="alert" className="text-sm font-medium text-destructive">{message}</p> : null; }
function SelectField({ label, placeholder, value, options, error, inputRef, onChange }: { label: string; placeholder: string; value: string; options: string[]; error?: string; inputRef: RefObject<HTMLButtonElement | null>; onChange: (value: string) => void }) { const fieldId = label.toLowerCase().replaceAll(" ", "-"); const errorId = `${fieldId}-error`; return <div className="space-y-2"><Label htmlFor={fieldId}>{label} <span className="text-destructive">*</span></Label><Select value={value} onValueChange={onChange}><SelectTrigger id={fieldId} ref={inputRef} className="min-h-11 text-base" aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined}><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent>{options.map((option) => <SelectItem key={option} value={option} className="min-h-11 text-base">{option}</SelectItem>)}</SelectContent></Select><ErrorText id={errorId} message={error} /></div>; }
function Conversation({ values, errors, refs, update, onContinue }: { values: Values; errors: Errors; refs: Refs; update: (key: keyof Values, value: string) => void; onContinue: () => void }) { return <div className="grid gap-6 lg:grid-cols-[1fr_360px]"><Card><CardHeader className="space-y-2"><CardTitle className="text-xl">Cannot export August report</CardTitle><CardDescription><span className="font-medium text-foreground">Waiting 18 min</span>, Ari from Mono</CardDescription></CardHeader><CardContent className="space-y-5"><div className="rounded-md border bg-muted/40 p-4"><p className="text-sm font-medium">Customer message</p><p className="mt-2 leading-7">The export has been running for ten minutes and never finishes. I need the August report for our finance review.</p></div><div className="grid gap-5 sm:grid-cols-2"><SelectField label="Assignee" placeholder="Choose a teammate" value={values.assignee} error={errors.assignee} inputRef={refs.assignee} options={["You", "Alex Kim", "Nia Jones"]} onChange={(v) => update("assignee", v)} /><SelectField label="Priority" placeholder="Urgent" value={values.priority} error={errors.priority} inputRef={refs.priority} options={["Urgent", "Normal", "Low"]} onChange={(v) => update("priority", v)} /></div><div className="space-y-2"><Label htmlFor="reply">Reply <span className="text-destructive">*</span></Label><Textarea ref={refs.reply} id="reply" value={values.reply} onChange={(e) => update("reply", e.target.value)} onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") onContinue(); }} placeholder="Write a helpful response" aria-invalid={Boolean(errors.reply)} aria-describedby={errors.reply ? "reply-error" : undefined} className="min-h-32 text-base" required /><ErrorText id="reply-error" message={errors.reply} /><p className="text-sm text-muted-foreground">Ctrl+Enter or ⌘Enter continues to review.</p></div><div className="space-y-2"><Label htmlFor="note">Internal note <span className="font-normal text-muted-foreground">(optional)</span></Label><Textarea id="note" value={values.note} onChange={(e) => update("note", e.target.value)} placeholder="Add context for the next teammate" className="min-h-24 text-base" /></div><div className="flex justify-end"><Button onClick={onContinue} className="min-h-11 w-full sm:w-auto">Assign and reply<NavArrowRightIcon className="size-4" /></Button></div></CardContent></Card><Card className="h-fit"><CardHeader className="space-y-2"><CardTitle className="text-lg">Conversation context</CardTitle><CardDescription>Recent activity from Mono.</CardDescription></CardHeader><CardContent className="space-y-4 text-sm"><p><strong>10:42 AM, Ari</strong><br /><span className="text-muted-foreground">Export request started from the August reports view.</span></p><p><strong>10:48 AM, Ari</strong><br /><span className="text-muted-foreground">Followed up after the export stayed in progress.</span></p></CardContent></Card></div>; }

function Review({ values, errors, refs, update, onBack, onSend }: { values: Values; errors: Errors; refs: Refs; update: (key: keyof Values, value: string) => void; onBack: () => void; onSend: () => void }) { return <Card className="mx-auto max-w-3xl"><CardHeader className="space-y-2"><CardTitle className="text-xl">Review response</CardTitle><CardDescription>Confirm the reply and outcome before sending it to Ari.</CardDescription></CardHeader><CardContent className="space-y-6"><div className="grid gap-4 sm:grid-cols-2"><Summary label="Assignee" value={values.assignee} /><Summary label="Priority" value={values.priority} /></div><div><p className="text-sm font-medium">Reply</p><p className="mt-2 rounded-md border bg-muted/40 p-4 leading-7">{values.reply}</p></div>{values.note ? <div><p className="text-sm font-medium">Internal note</p><p className="mt-2 rounded-md border bg-muted/40 p-4 leading-7">{values.note}</p></div> : null}<SelectField label="Resolution" placeholder="Select outcome" value={values.resolution} error={errors.resolution} inputRef={refs.resolution} options={["Resolved", "Needs engineering", "Waiting on customer"]} onChange={(v) => update("resolution", v)} /><div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button variant="outline" onClick={onBack} className="min-h-11">Back to edit</Button><Button onClick={onSend} className="min-h-11">Send response<NavArrowRightIcon className="size-4" /></Button></div></CardContent></Card>; }
function Summary({ label, value }: { label: string; value: string }) { return <div className="rounded-md border p-4"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 font-medium">{value}</p></div>; }
function Completion({ values, onReset }: { values: Values; onReset: () => void }) { return <Card className="mx-auto max-w-2xl"><CardContent className="flex flex-col items-center px-6 py-12 text-center sm:px-12"><span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary"><CheckIcon className="size-7" /></span><h2 className="mt-5 text-2xl font-semibold">Response sent</h2><p className="mt-2 max-w-md text-muted-foreground">Ari received the reply and the selected status was saved.</p><div className="mt-8 w-full rounded-md border bg-muted/40 p-4 text-left text-sm"><div className="flex justify-between gap-4"><span className="text-muted-foreground">Assignee</span><span className="font-medium">{values.assignee}</span></div><div className="mt-3 flex justify-between gap-4"><span className="text-muted-foreground">Resolution</span><span className="font-medium">{values.resolution}</span></div></div><Button onClick={onReset} className="mt-8 min-h-11 w-full sm:w-auto">Next conversation<NavArrowRightIcon className="size-4" /></Button></CardContent></Card>; }
