"use client";
import { OnboardingStepper } from "@/components/ui/ix-onboarding-stepper";
import benchmarkFixture from "../../benchmark/fixture.json";

import { useRef, useState } from "react";
import { ActivityIcon, ArrowRightIcon, CheckCircleIcon, LinkIcon, RefreshIcon } from "@/components/icons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FormValues = { name: string; triggerApp: string; triggerEvent: string; action: string; note: string };
type Errors = Partial<Record<keyof FormValues, string>>;
const fields = [
  { key: "triggerApp" as const, label: "Trigger app", placeholder: "Formline", options: ["Formline", "Ledgerly", "Harbor"] },
  { key: "triggerEvent" as const, label: "Trigger event", placeholder: "New response", options: ["New response", "Invoice overdue", "Ticket resolved"] },
  { key: "action" as const, label: "Action", placeholder: "Create CRM record", options: ["Create CRM record", "Post message", "Create task"] },
];
const steps = ["Automations", "Choose trigger and action", "Review test data", "Automation published"];





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
  const [values, setValues] = useState<FormValues>({ name: "", triggerApp: "", triggerEvent: "", action: "", note: "" });
  const [errors, setErrors] = useState<Errors>({});
  const fieldRefs = useRef<Array<HTMLInputElement | HTMLButtonElement | null>>([]);
  const setFieldRef = (index: number, element: HTMLInputElement | HTMLButtonElement | null) => { fieldRefs.current[index] = element; };

  function updateValue(key: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  }
  function validateAndContinue() {
    const nextErrors: Errors = {};
    if (!values.name.trim()) nextErrors.name = "Enter a name for this automation.";
    if (!values.triggerApp) nextErrors.triggerApp = "Choose the app that starts this automation.";
    if (!values.triggerEvent) nextErrors.triggerEvent = "Choose the event that starts this automation.";
    if (!values.action) nextErrors.action = "Choose what the automation should do.";
    setErrors(nextErrors);
    const keys = ["name", "triggerApp", "triggerEvent", "action"] as const;
    const firstInvalid = keys.find((key) => nextErrors[key]);
    if (firstInvalid) {
      window.setTimeout(() => fieldRefs.current[keys.indexOf(firstInvalid)]?.focus(), 0);
      return;
    }
    setStep(2);
  }
  function reset() {
    setValues({ name: "", triggerApp: "", triggerEvent: "", action: "", note: "" });
    setErrors({});
    setStep(0);
  }

  return <div id="top" className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border/70 bg-card"><div className="mx-auto flex min-h-16 max-w-[1472px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-12">
      <a href="#top" className="flex min-h-11 items-center gap-3 rounded-md font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Switchboard home"><span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground"><LinkIcon className="size-5" /></span><span>Switchboard</span></a>
      <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">{["Automations", "Runs", "Connections", "Templates"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className={`flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${item === "Automations" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{item}</a>)}</nav>
      <div className="flex items-center gap-2 text-sm text-muted-foreground"><span className="size-2 rounded-full bg-[var(--label-low)]" aria-hidden="true" /> Operations</div>
    </div></header>
    <main id="workspace" className="mx-auto max-w-[1472px] px-4 py-6 sm:px-6 sm:py-8 lg:px-12">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Automation publishing</h1><p className="mt-2 max-w-xl text-base text-muted-foreground">Connect a trigger and action, test the data, and publish the automation.</p></div><div className="grid grid-cols-3 gap-2 sm:gap-3" aria-label="Automation statistics">{[{ label: "Active", value: "17" }, { label: "Runs today", value: "1,284" }, { label: "Errors", value: "6" }].map((stat) => <div key={stat.label} className="min-w-20 rounded-xl border border-border/70 bg-card px-3 py-2.5 sm:min-w-28 sm:px-4"><div className="text-xl font-semibold tracking-tight">{stat.value}</div><div className="text-sm text-muted-foreground">{stat.label}</div></div>)}</div></div>
      <><BenchmarkStepper currentStep={step} onStepChange={(nextStep) => setStep(nextStep as typeof step)} /><div className="hidden" aria-hidden="true"><div className="mb-8 overflow-x-auto pb-1"><ol className="flex min-w-[610px] items-center" aria-label="Automation publishing progress">{steps.map((label, index) => <li key={label} className="flex flex-1 items-center gap-2 text-sm" aria-current={step === index ? "step" : undefined}><span className={`grid size-9 shrink-0 place-items-center rounded-full border text-sm font-semibold ${index <= step ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}>{index < step ? <CheckCircleIcon className="size-5" /> : index + 1}</span><span className={index === step ? "font-semibold text-foreground" : "text-muted-foreground"}>{label}</span>{index < steps.length - 1 && <span className={`mx-2 h-px flex-1 ${index < step ? "bg-primary" : "bg-border"}`} aria-hidden="true" />}</li>)}</ol></div></div></>
      {step === 0 && <Overview onStart={() => setStep(1)} />}
      {step === 1 && <FormStep values={values} errors={errors} setFieldRef={setFieldRef} onChange={updateValue} onBack={() => setStep(0)} onContinue={validateAndContinue} />}
      {step === 2 && <Review values={values} onBack={() => setStep(1)} onPublish={() => setStep(3)} />}
      {step === 3 && <Completion values={values} onReset={reset} onView={() => setStep(0)} />}
    </main>
  </div>;
}

function Overview({ onStart }: { onStart: () => void }) { return <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"><Card><CardHeader><CardTitle className="text-xl">Active automations</CardTitle></CardHeader><CardContent className="space-y-3">{[{ title: "New lead → CRM", detail: "Web form to Northstar", meta: "428 runs this week", status: "Active" }, { title: "Refund → Support note", detail: "Ledgerly to Harbor", meta: "92 runs this week", status: "Active" }, { title: "Invoice overdue → Slack", detail: "Ledgerly to chat", meta: "3 errors", status: "Needs attention" }].map((record) => <div key={record.title} className="flex flex-col gap-3 rounded-xl border border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="font-medium">{record.title}</div><div className="mt-1 text-sm text-muted-foreground">{record.detail}</div><div className="text-sm text-muted-foreground">{record.meta}</div></div><Badge variant={record.status === "Active" ? "secondary" : "destructive"}>{record.status}</Badge></div>)}</CardContent></Card><Card className="h-fit"><CardHeader><div className="mb-2 grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground"><ActivityIcon className="size-5" /></div><CardTitle className="text-xl">Create an automation</CardTitle></CardHeader><CardContent><p className="text-base text-muted-foreground">Set up a trigger, action, and test before publishing.</p><Button className="mt-6 min-h-11 w-full" size="lg" onClick={onStart}>Create automation <ArrowRightIcon className="size-5" /></Button></CardContent></Card></div>; }

function FormStep({ values, errors, setFieldRef, onChange, onBack, onContinue }: { values: FormValues; errors: Errors; setFieldRef: (index: number, element: HTMLInputElement | HTMLButtonElement | null) => void; onChange: (key: keyof FormValues, value: string) => void; onBack: () => void; onContinue: () => void }) { return <div className="mx-auto max-w-2xl"><Card><CardHeader><CardTitle className="text-xl">Choose trigger and action</CardTitle><p className="text-base text-muted-foreground">Connect a new form response to a CRM record.</p></CardHeader><CardContent><form onSubmit={(event) => { event.preventDefault(); onContinue(); }} noValidate className="space-y-5"><div className="space-y-2"><Label htmlFor="automation-name">Automation name</Label><Input ref={(element) => setFieldRef(0, element)} id="automation-name" value={values.name} onChange={(event) => onChange("name", event.target.value)} placeholder="New lead to CRM" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "automation-name-error" : undefined} />{errors.name && <FieldError id="automation-name-error">{errors.name}</FieldError>}</div>{fields.map((field, index) => <div key={field.key} className="space-y-2"><Label htmlFor={field.key}>{field.label}</Label><Select value={values[field.key]} onValueChange={(value) => onChange(field.key, value)}><SelectTrigger ref={(element) => setFieldRef(index + 1, element)} id={field.key} aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}><SelectValue placeholder={field.placeholder} /></SelectTrigger><SelectContent>{field.options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select>{errors[field.key] && <FieldError id={`${field.key}-error`}>{errors[field.key]}</FieldError>}</div>)}<div className="space-y-2"><Label htmlFor="internal-note">Internal note <span className="font-normal text-muted-foreground">(optional)</span></Label><Textarea id="internal-note" value={values.note} onChange={(event) => onChange("note", event.target.value)} placeholder="Add context for teammates" rows={3} /></div><div className="flex flex-col-reverse gap-3 border-t border-border/70 pt-5 sm:flex-row sm:justify-between"><Button type="button" variant="outline" className="min-h-11" onClick={onBack}>Back</Button><Button type="submit" size="lg" className="min-h-11">Test automation <ArrowRightIcon className="size-5" /></Button></div></form></CardContent></Card></div>; }

function Review({ values, onBack, onPublish }: { values: FormValues; onBack: () => void; onPublish: () => void }) { return <div className="mx-auto max-w-2xl"><Card><CardHeader><CardTitle className="text-xl">Review test data</CardTitle><p className="text-base text-muted-foreground">Confirm the fields map correctly before going live.</p></CardHeader><CardContent><Alert className="mb-6 border-[var(--label-low)]/30 bg-[var(--label-low-soft)]"><CheckCircleIcon className="size-5 text-[var(--label-low-ink)]" /><AlertDescription className="text-foreground">Test passed. The sample response can create a customer record.</AlertDescription></Alert><dl className="divide-y divide-border/70 rounded-xl border border-border/70"><ReviewRow label="Automation name" value={values.name} /><ReviewRow label="Trigger app" value={values.triggerApp} /><ReviewRow label="Trigger event" value={values.triggerEvent} /><ReviewRow label="Action" value={values.action} />{values.note && <ReviewRow label="Internal note" value={values.note} />}</dl><div className="flex flex-col-reverse gap-3 border-t border-border/70 pt-5 sm:flex-row sm:justify-between"><Button type="button" variant="outline" className="min-h-11" onClick={onBack}>Back to edit</Button><Button type="button" size="lg" className="min-h-11" onClick={onPublish}>Publish automation <ArrowRightIcon className="size-5" /></Button></div></CardContent></Card></div>; }
function ReviewRow({ label, value }: { label: string; value: string }) { return <div className="grid gap-1 px-4 py-3 sm:grid-cols-[150px_1fr] sm:gap-4"><dt className="text-sm text-muted-foreground">{label}</dt><dd className="break-words text-base font-medium">{value}</dd></div>; }
function FieldError({ id, children }: { id: string; children: React.ReactNode }) { return <p id={id} className="text-sm font-medium text-destructive" role="alert">{children}</p>; }
function Completion({ values, onReset, onView }: { values: FormValues; onReset: () => void; onView: () => void }) { return <div className="mx-auto max-w-xl"><Card className="text-center"><CardContent className="p-6 sm:p-10"><div className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--label-low-soft)] text-[var(--label-low-ink)]"><CheckCircleIcon className="size-8" /></div><h2 className="mt-5 text-2xl font-semibold tracking-tight">Automation published</h2><p className="mx-auto mt-2 max-w-md text-base text-muted-foreground">New qualifying form responses now create CRM records.</p><p className="mt-5 font-medium">{values.name}</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Button className="min-h-11" onClick={onView}>View automation <ArrowRightIcon className="size-5" /></Button><Button variant="outline" className="min-h-11" onClick={onReset}><RefreshIcon className="size-5" /> Create another</Button></div></CardContent></Card></div>; }
