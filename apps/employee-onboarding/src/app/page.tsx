"use client";
import { OnboardingStepper } from "@/components/ui/ix-onboarding-stepper";
import benchmarkFixture from "../../benchmark/fixture.json";

import { useRef, useState, type RefObject } from "react";
import { ArrowLeftDuotoneIcon, ArrowRightDuotoneIcon, CalendarDuotoneIcon, CheckCircleDuotoneIcon, FileTextDuotoneIcon, HouseDuotoneIcon, NoteDuotoneIcon, UsersDuotoneIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type Step = 0 | 1 | 2 | 3;
type FieldKey = "fullName" | "email" | "role" | "startDate" | "note";
type FormValues = Record<FieldKey, string>;
const initialValues: FormValues = { fullName: "", email: "", role: "", startDate: "", note: "" };
const navItems = ["People", "Onboarding", "Time off", "Documents"];
const steps = [
  { title: "Onboarding", description: "See who is starting soon and what still needs attention.", action: "Add employee" },
  { title: "Employee details", description: "Record the new hire's role, manager, and start date.", action: "Set up onboarding" },
  { title: "Review first week", description: "Confirm documents, equipment, and orientation tasks.", action: "Start onboarding" },
  { title: "Onboarding started", description: "Jamie and every task owner received their next steps.", action: "View checklist" },
];





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
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [activeNav, setActiveNav] = useState("Onboarding");
  const firstInvalidRef = useRef<HTMLInputElement | null>(null);
  const updateValue = (key: FieldKey, value: string) => { setValues((current) => ({ ...current, [key]: value })); if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined })); };
  const validateDetails = () => {
    const nextErrors: Partial<Record<FieldKey, string>> = {};
    if (!values.fullName.trim()) nextErrors.fullName = "Enter the employee's full name.";
    if (!values.email.trim()) nextErrors.email = "Enter a work email address.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = "Enter a valid work email address.";
    if (!values.role.trim()) nextErrors.role = "Enter the employee's role.";
    if (!values.startDate) nextErrors.startDate = "Choose a start date.";
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0] as FieldKey | undefined;
    if (firstInvalid) { window.setTimeout(() => firstInvalidRef.current?.focus(), 0); return false; }
    return true;
  };
  const nextStep = () => { if (step === 0) return setStep(1); if (step === 1 && !validateDetails()) return; setStep((current) => Math.min(3, current + 1) as Step); };
  const reset = () => { setValues(initialValues); setErrors({}); setStep(0); setActiveNav("Onboarding"); };
  return <div className="min-h-screen bg-background text-foreground">
    <header className="border-b bg-card"><div className="mx-auto flex min-h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10"><Button variant="ghost" className="min-h-11 gap-2 px-2 text-base font-semibold" onClick={() => setActiveNav("People")} aria-label="Welcome home"><span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"><HouseDuotoneIcon className="size-5" /></span>Welcome</Button><div className="flex items-center gap-2 text-sm text-muted-foreground"><span className="hidden sm:inline">People operations</span><span className="grid size-9 place-items-center rounded-full bg-accent font-semibold text-accent-foreground">MK</span></div></div></header>
    <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row"><aside className="border-b bg-card lg:min-h-[calc(100vh-64px)] lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r"><nav aria-label="Main navigation" className="flex gap-1 overflow-x-auto p-3 lg:block lg:space-y-1 lg:p-5">{navItems.map((item) => <Button key={item} variant={activeNav === item ? "secondary" : "ghost"} className="min-h-11 shrink-0 justify-start px-3 text-base lg:w-full" onClick={() => setActiveNav(item)}>{item}</Button>)}</nav></aside>
      <main className="min-w-0 flex-1 px-4 py-7 sm:px-8 sm:py-10 lg:px-12"><div className="mx-auto max-w-5xl"><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{steps[step].title}</h1><p className="mt-2 max-w-2xl text-base text-muted-foreground">{steps[step].description}</p></div>{activeNav !== "Onboarding" && <Badge variant="outline" className="w-fit">{activeNav} selected</Badge>}</div><><BenchmarkStepper currentStep={step} onStepChange={(nextStep) => setStep(nextStep as typeof step)} /><div className="hidden" aria-hidden="true"><Progress value={(step / 3) * 100} className="mb-6 h-2" aria-label={`Step ${step + 1} of 4`} /></div></>
        <div className="hidden" aria-hidden="true"><nav aria-label="Onboarding progress" className="mb-8 grid grid-cols-4 gap-2">{steps.map((item, index) => <Button key={item.title} variant="ghost" disabled={index > step} onClick={() => index <= step && setStep(index as Step)} className={`h-auto min-h-14 justify-start gap-2 rounded-lg px-2 text-left sm:px-3 ${index === step ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`} aria-current={index === step ? "step" : undefined}><span className={`grid size-7 shrink-0 place-items-center rounded-full border text-sm ${index <= step ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{index + 1}</span><span className="hidden text-sm font-medium sm:block">{item.title}</span></Button>)}</nav></div>
        {step === 0 && <Overview onStart={nextStep} />}{step === 1 && <Details values={values} errors={errors} updateValue={updateValue} firstInvalidRef={firstInvalidRef} />}{step === 2 && <Review values={values} />}{step === 3 && <Complete values={values} onReset={reset} />}
        {step > 0 && step < 3 && <div className="mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-between"><Button variant="outline" className="min-h-11" onClick={() => setStep((step - 1) as Step)}><ArrowLeftDuotoneIcon className="mr-2 size-5" />Back</Button><Button className="min-h-11" onClick={nextStep}>{steps[step].action}<ArrowRightDuotoneIcon className="ml-2 size-5" /></Button></div>}
      </div></main></div>
  </div>;
}

function Overview({ onStart }: { onStart: () => void }) { const records = [{ title: "Jamie Park", detail: "Product Designer", meta: "Starts 2 Sep", status: "Needs documents" }, { title: "Morgan Lee", detail: "Staff Engineer", meta: "Starts 26 Aug", status: "Ready" }, { title: "Taylor Reed", detail: "Account Executive", meta: "Started 12 Aug", status: "Complete" }]; return <div className="space-y-6"><div className="grid gap-4 sm:grid-cols-3">{[["Starting soon", "6"], ["Needs action", "4"], ["Complete", "18"]].map(([label, value]) => <Card key={label}><CardContent className="p-5"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-3xl font-semibold tabular-nums">{value}</p></CardContent></Card>)}</div><Card><CardHeader className="flex flex-row items-start justify-between gap-4"><div><CardTitle className="text-xl">People to keep moving</CardTitle><p className="mt-1 text-sm text-muted-foreground">Recent onboarding activity across your team.</p></div><Button className="min-h-11 shrink-0" onClick={onStart}>Add employee<ArrowRightDuotoneIcon className="ml-2 size-5" /></Button></CardHeader><CardContent className="space-y-1">{records.map((record) => <div key={record.title} className="flex flex-col gap-2 rounded-lg px-2 py-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground"><UsersDuotoneIcon className="size-5" /></span><div><p className="font-medium">{record.title}</p><p className="text-sm text-muted-foreground">{record.detail}, {record.meta}</p></div></div><Badge variant={record.status === "Complete" ? "secondary" : record.status === "Ready" ? "outline" : "default"} className="w-fit sm:ml-auto">{record.status}</Badge></div>)}</CardContent></Card></div>; }

function Details({ values, errors, updateValue, firstInvalidRef }: { values: FormValues; errors: Partial<Record<FieldKey, string>>; updateValue: (key: FieldKey, value: string) => void; firstInvalidRef: RefObject<HTMLInputElement | null> }) { const fields: { key: Exclude<FieldKey, "note">; label: string; placeholder: string; type?: string }[] = [{ key: "fullName", label: "Full name", placeholder: "Jamie Park" }, { key: "email", label: "Work email", placeholder: "jamie@company.com", type: "email" }, { key: "role", label: "Role", placeholder: "Product Designer" }, { key: "startDate", label: "Start date", placeholder: "Choose a date", type: "date" }]; return <Card><CardHeader><CardTitle className="text-xl">Employee details</CardTitle><p className="text-sm text-muted-foreground">Add the details your team needs to prepare the first week.</p></CardHeader><CardContent><form onSubmit={(event) => event.preventDefault()} className="space-y-5">{fields.map((field) => <div key={field.key} className="space-y-2"><Label htmlFor={field.key}>{field.label}<span className="ml-1 text-destructive" aria-hidden="true">*</span></Label><div className="relative">{field.key === "startDate" && <CalendarDuotoneIcon className="pointer-events-none absolute left-3 top-3 size-5 text-muted-foreground" />}<Input ref={field.key === "fullName" ? firstInvalidRef : undefined} id={field.key} name={field.key} type={field.type ?? "text"} placeholder={field.placeholder} value={values[field.key]} onChange={(event) => updateValue(field.key, event.target.value)} aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key] ? `${field.key}-error` : undefined} className={`min-h-12 text-base sm:text-sm ${field.key === "startDate" ? "pl-10" : ""}`} /></div>{errors[field.key] && <p id={`${field.key}-error`} className="text-sm font-medium text-destructive" role="alert">{errors[field.key]}</p>}</div>)}<Separator /><div className="space-y-2"><Label htmlFor="note">Internal note <span className="font-normal text-muted-foreground">(optional)</span></Label><div className="relative"><NoteDuotoneIcon className="pointer-events-none absolute left-3 top-3 size-5 text-muted-foreground" /><Textarea id="note" name="note" placeholder="Add context for the people helping with this onboarding" value={values.note} onChange={(event) => updateValue("note", event.target.value)} className="min-h-28 resize-y pl-10 text-base sm:text-sm" /></div></div></form></CardContent></Card>; }

function Review({ values }: { values: FormValues }) { const tasks = [["Documents", "Offer and policy documents are ready", FileTextDuotoneIcon], ["Equipment", "Laptop and access requests are assigned", UsersDuotoneIcon], ["Orientation", "First-week meetings are on the calendar", CalendarDuotoneIcon]] as const; return <div className="space-y-6"><Card><CardHeader><CardTitle className="text-xl">First-week checklist</CardTitle><p className="text-sm text-muted-foreground">Review the setup owners will receive when you start onboarding.</p></CardHeader><CardContent className="space-y-3">{tasks.map(([title, description, Icon]) => <div key={title} className="flex gap-3 rounded-lg border bg-background p-4"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"><Icon className="size-5" /></span><div><p className="font-medium">{title}</p><p className="text-sm text-muted-foreground">{description}</p></div><CheckCircleDuotoneIcon className="ml-auto size-5 shrink-0 text-primary" /></div>)}</CardContent></Card><Card><CardHeader><CardTitle className="text-xl">Employee summary</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2">{[["Full name", values.fullName], ["Work email", values.email], ["Role", values.role], ["Start date", values.startDate]].map(([label, value]) => <div key={label}><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 font-medium">{value}</p></div>)}{values.note && <div className="sm:col-span-2"><p className="text-sm text-muted-foreground">Internal note</p><p className="mt-1 whitespace-pre-wrap font-medium">{values.note}</p></div>}</CardContent></Card></div>; }

function Complete({ values, onReset }: { values: FormValues; onReset: () => void }) { return <Card className="overflow-hidden"><CardContent className="flex flex-col items-center px-6 py-14 text-center sm:px-12"><span className="grid size-16 place-items-center rounded-full bg-primary/15 text-primary"><CheckCircleDuotoneIcon className="size-10" /></span><h2 className="mt-6 text-2xl font-semibold">Onboarding started</h2><p className="mt-2 max-w-md text-muted-foreground">{values.fullName || "The employee"} and every task owner received their next steps.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button className="min-h-11" onClick={() => window.alert("Checklist opened")}>View checklist<ArrowRightDuotoneIcon className="ml-2 size-5" /></Button><Button variant="outline" className="min-h-11" onClick={onReset}>Add another employee</Button></div></CardContent></Card>; }
