"use client";
import { OnboardingStepper } from "@/components/ui/ix-onboarding-stepper";
import benchmarkFixture from "../../benchmark/fixture.json";

import { useRef, useState, type RefObject } from "react";
import { ArrowRightIcon, CheckIcon, PageIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type Step = 0 | 1 | 2 | 3;
type FieldKey = "agreement" | "signerName" | "signerEmail" | "dueDate" | "note";
type FormValues = Record<FieldKey, string>;
type FieldRefs = Record<Exclude<FieldKey, "note">, RefObject<HTMLInputElement | null>>;

const navItems = ["Agreements", "Templates", "Contacts", "Reports"];
const steps = [
  { title: "Agreements", description: "Track drafts, signatures, and completed documents.", action: "Prepare agreement" },
  { title: "Add signer details", description: "Choose the agreement and identify who must sign.", action: "Place fields" },
  { title: "Review and send", description: "Confirm signature fields, message, and due date.", action: "Send agreement" },
  { title: "Agreement sent", description: "Jamie received a secure link to review and sign.", action: "Track agreement" },
];
const records = [
  { title: "Design contractor agreement", detail: "Jamie Park", meta: "Prepared 18 Aug", status: "Draft" },
  { title: "Mutual NDA", detail: "Northwind Studio", meta: "Sent 17 Aug", status: "Awaiting" },
  { title: "Offer letter", detail: "Morgan Lee", meta: "Signed 16 Aug", status: "Complete" },
];
const stats = [{ label: "Awaiting signature", value: "9" }, { label: "Completed this month", value: "32" }, { label: "Expiring", value: "4" }];
const initialValues: FormValues = { agreement: "", signerName: "", signerEmail: "", dueDate: "", note: "" };

function statusVariant(status: string) { return status === "Complete" ? "success" as const : status === "Awaiting" ? "accent" as const : "secondary" as const; }





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
  const [step, setStep] = useState<Step>(0);
  const [activeNav, setActiveNav] = useState("Agreements");
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [notice, setNotice] = useState("");
  const refs: FieldRefs = { agreement: useRef(null), signerName: useRef(null), signerEmail: useRef(null), dueDate: useRef(null) };

  function updateValue(field: FieldKey, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }
  function validate() {
    const next: Partial<Record<FieldKey, string>> = {};
    if (!values.agreement.trim()) next.agreement = "Enter the agreement name.";
    if (!values.signerName.trim()) next.signerName = "Enter the signer’s name.";
    if (!values.signerEmail.trim()) next.signerEmail = "Enter the signer’s email.";
    else if (!/^\S+@\S+\.\S+$/.test(values.signerEmail)) next.signerEmail = "Enter a valid email address.";
    if (!values.dueDate) next.dueDate = "Choose a due date.";
    setErrors(next);
    const first = (["agreement", "signerName", "signerEmail", "dueDate"] as const).find((key) => next[key]);
    if (first) refs[first].current?.focus();
    return Object.keys(next).length === 0;
  }
  function reset() { setStep(0); setValues(initialValues); setErrors({}); setNotice(""); setActiveNav("Agreements"); }
  function selectNav(item: string) { setActiveNav(item); setNotice(item === "Agreements" ? "" : `${item} is available from the main workspace.`); if (item === "Agreements") setStep(0); }
  function next() { if (step === 1 && !validate()) return; setNotice(""); setStep((current) => Math.min(3, current + 1) as Step); }

  return <div className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border bg-card"><div className="mx-auto flex min-h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10"><Button variant="ghost" className="h-11 gap-2 px-2 text-base font-semibold tracking-[-0.03em]" onClick={reset} aria-label="Countersign home"><span className="flex size-8 items-center justify-center rounded-[9px] bg-primary text-primary-foreground"><PageIcon className="size-[18px]" /></span>Countersign</Button><span className="hidden text-sm text-muted-foreground sm:block">Legal operations workspace</span></div></header>
    <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row"><aside className="w-full shrink-0 border-b border-border bg-sidebar px-4 py-4 lg:min-h-[calc(100vh-4rem)] lg:w-60 lg:border-b-0 lg:border-r lg:px-5 lg:py-8"><nav aria-label="Main navigation" className="flex gap-1 overflow-x-auto lg:block">{navItems.map((item) => <Button key={item} variant={activeNav === item ? "secondary" : "ghost"} className="min-h-11 shrink-0 justify-start px-3 text-sm" onClick={() => selectNav(item)} aria-current={activeNav === item ? "page" : undefined}>{item}</Button>)}</nav><div className="mt-8 hidden border-t border-border pt-6 lg:block"><p className="text-xs font-medium text-muted-foreground">Workspace overview</p><p className="mt-2 text-sm leading-relaxed">Keep every agreement moving from draft to signed.</p></div></aside>
      <main className="min-w-0 flex-1 px-4 py-7 sm:px-6 sm:py-10 lg:px-12">{notice && <div role="status" className="mx-auto mb-5 max-w-5xl rounded-[9px] bg-accent px-4 py-3 text-sm text-accent-foreground">{notice}</div>}{step === 0 ? <Overview onStart={() => { setActiveNav("Agreements"); setNotice(""); setStep(1); }} /> : <><BenchmarkStepper currentStep={step} onStepChange={(nextStep) => setStep(nextStep as typeof step)} /><Workflow step={step} values={values} errors={errors} refs={refs} onChange={updateValue} onBack={() => setStep((current) => Math.max(1, current - 1) as Step)} onNext={next} onReset={reset} /></>}</main>
    </div>
  </div>;
}

  function Overview({ onStart }: { onStart: () => void }) { return <div className="mx-auto max-w-5xl"><section className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div className="max-w-xl"><h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Agreements</h1><p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">Track drafts, signatures, and completed documents.</p></div><Button size="lg" className="min-h-11 w-full sm:w-auto" onClick={onStart}>Prepare agreement <ArrowRightIcon /></Button></section><section aria-label="Agreement statistics" className="mt-8 grid gap-3 sm:grid-cols-3">{stats.map((stat) => <Card key={stat.label} className="p-5"><p className="text-sm text-muted-foreground">{stat.label}</p><p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{stat.value}</p></Card>)}</section><section className="mt-10"><div className="mb-3 flex items-center justify-between"><h2 className="text-xl font-semibold tracking-[-0.03em]">Recent agreements</h2><span className="text-sm text-muted-foreground">3 records</span></div><Card className="overflow-hidden"><Table><TableHeader><TableRow><TableHead>Agreement</TableHead><TableHead className="hidden sm:table-cell">Signer</TableHead><TableHead className="hidden sm:table-cell">Updated</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{records.map((record) => <TableRow key={record.title}><TableCell><div className="font-medium">{record.title}</div></TableCell><TableCell className="hidden sm:table-cell">{record.detail}</TableCell><TableCell className="hidden text-muted-foreground sm:table-cell">{record.meta}</TableCell><TableCell><Badge variant={statusVariant(record.status)}>{record.status}</Badge></TableCell></TableRow>)}</TableBody></Table></Card></section></div>; }

function Workflow({ step, values, errors, refs, onChange, onBack, onNext, onReset }: { step: Step; values: FormValues; errors: Partial<Record<FieldKey, string>>; refs: FieldRefs; onChange: (field: FieldKey, value: string) => void; onBack: () => void; onNext: () => void; onReset: () => void }) {
  const current = steps[step];
  return <div className="mx-auto max-w-3xl"><div className="hidden" aria-hidden="true"><nav aria-label="Agreement progress" className="mb-9 overflow-x-auto"><ol className="flex min-w-[520px] items-start">{steps.map((item, index) => <li key={item.title} className="flex flex-1 items-start"><div className="flex min-w-0 flex-col items-center text-center"><Button type="button" variant="ghost" size="icon" className={`size-9 rounded-full border text-sm ${index < step ? "border-primary bg-primary text-primary-foreground" : index === step ? "border-primary bg-card text-foreground" : "border-border bg-secondary text-muted-foreground"}`} onClick={() => index < step && onBack()} aria-label={`Step ${index + 1}: ${item.title}`} aria-current={index === step ? "step" : undefined}>{index < step ? <CheckIcon /> : index + 1}</Button><span className={`mt-2 text-xs ${index === step ? "font-medium text-foreground" : "text-muted-foreground"}`}>{item.title}</span></div>{index < steps.length - 1 && <div className={`mt-4 h-px flex-1 ${index < step ? "bg-primary" : "bg-border"}`} />}</li>)}</ol></nav></div><div className="mb-7"><h1 className="text-3xl font-semibold tracking-[-0.04em]">{current.title}</h1><p className="mt-3 text-base leading-relaxed text-muted-foreground">{current.description}</p></div>{step === 1 && <EntryForm values={values} errors={errors} refs={refs} onChange={onChange} />}{step === 2 && <Review values={values} />}{step === 3 && <Completion onReset={onReset} />}{step < 3 && <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between"><Button variant="ghost" className="min-h-11" onClick={onBack}>Back</Button><Button size="lg" className="min-h-11 w-full sm:w-auto" onClick={onNext}>{current.action} <ArrowRightIcon /></Button></div>}</div>;
}

function EntryForm({ values, errors, refs, onChange }: { values: FormValues; errors: Partial<Record<FieldKey, string>>; refs: FieldRefs; onChange: (field: FieldKey, value: string) => void }) {
  const input = (key: Exclude<FieldKey, "note">, label: string, placeholder: string, type = "text") => <div><label htmlFor={key} className="mb-2 block text-sm font-medium">{label} <span className="text-destructive">*</span></label><Input ref={refs[key]} id={key} type={type} value={values[key]} placeholder={placeholder} required aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} onChange={(event) => onChange(key, event.target.value)} className={`min-h-11 text-base ${errors[key] ? "border-destructive focus-visible:border-destructive" : ""}`} />{errors[key] && <p id={`${key}-error`} role="alert" className="mt-2 text-sm text-destructive">{errors[key]}</p>}</div>;
  return <Card><CardHeader><CardTitle>Signer and agreement details</CardTitle></CardHeader><CardContent><div className="grid gap-5 sm:grid-cols-2">{input("agreement", "Agreement", "Design contractor agreement")}{input("signerName", "Signer name", "Jamie Park")}{input("signerEmail", "Signer email", "jamie@example.com", "email")}{input("dueDate", "Due date", "Choose a date", "date")}</div><div className="mt-6"><label htmlFor="note" className="mb-2 block text-sm font-medium">Internal note <span className="text-muted-foreground">(optional)</span></label><Textarea id="note" value={values.note} placeholder="Add context for your team" onChange={(event) => onChange("note", event.target.value)} className="min-h-28 text-base" /></div></CardContent></Card>;
}

function Review({ values }: { values: FormValues }) { const items = [["Agreement", values.agreement], ["Signer name", values.signerName], ["Signer email", values.signerEmail], ["Due date", values.dueDate]]; return <div className="space-y-4"><Card><CardHeader><CardTitle>Confirm before sending</CardTitle></CardHeader><CardContent><dl className="divide-y divide-border">{items.map(([label, value]) => <div key={label} className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[160px_1fr] sm:gap-4"><dt className="text-sm text-muted-foreground">{label}</dt><dd className="break-words text-base font-medium">{value}</dd></div>)}</dl></CardContent></Card>{values.note && <Card><CardHeader><CardTitle>Internal note</CardTitle></CardHeader><CardContent><p className="whitespace-pre-wrap text-base leading-relaxed">{values.note}</p></CardContent></Card>}</div>; }

function Completion({ onReset }: { onReset: () => void }) { return <Card><CardContent className="flex flex-col items-start gap-6 p-6 sm:p-8"><div className="flex size-12 items-center justify-center rounded-full bg-success/10 text-success"><CheckIcon className="size-6" /></div><div><h2 className="text-2xl font-semibold tracking-[-0.03em]">Agreement sent</h2><p className="mt-3 text-base leading-relaxed text-muted-foreground">Jamie received a secure link to review and sign.</p></div><Button size="lg" className="min-h-11" onClick={onReset}>Track agreement <ArrowRightIcon /></Button></CardContent></Card>; }
