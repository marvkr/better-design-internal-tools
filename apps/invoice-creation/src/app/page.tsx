"use client";
import { OnboardingStepper } from "@/components/ui/ix-onboarding-stepper";
import benchmarkFixture from "../../benchmark/fixture.json";

import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, GroupIcon, HomeSimpleIcon, PageIcon, PlusIcon, RefreshDoubleIcon, ReportsIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type Step = 0 | 1 | 2 | 3;
type FormValues = { customer: string; service: string; quantity: string; unitPrice: string; note: string };
const initialValues: FormValues = { customer: "", service: "", quantity: "", unitPrice: "", note: "" };
const navIcons = [HomeSimpleIcon, PageIcon, GroupIcon, ReportsIcon];
const nav = ["Overview", "Invoices", "Customers", "Reports"];
const records = [["Northwind Studio", "INV-2048", "$8,400 · Due 28 Aug", "Draft"], ["Fieldwork Labs", "INV-2047", "$12,900 · Due 22 Aug", "Sent"], ["Pine & Co.", "INV-2046", "$3,250 · Due 19 Aug", "Overdue"]];





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
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [activeNav, setActiveNav] = useState("Invoices");
  const [notice, setNotice] = useState("");
  const update = (field: keyof FormValues, value: string) => { setValues((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })); };
  const validate = () => { const next: Partial<Record<keyof FormValues, string>> = {}; if (!values.customer) next.customer = "Choose a customer."; if (!values.service.trim()) next.service = "Enter the service provided."; if (!values.quantity || Number(values.quantity) < 1) next.quantity = "Enter a quantity of at least 1."; if (!values.unitPrice || Number(values.unitPrice) <= 0) next.unitPrice = "Enter a unit price greater than 0."; setErrors(next); if (Object.keys(next).length) { const firstInvalidId = ["customer", "service", "quantity", "unit-price"].find((id) => next[id === "unit-price" ? "unitPrice" : id as keyof FormValues]); requestAnimationFrame(() => firstInvalidId && document.getElementById(firstInvalidId)?.focus()); return false; } return true; };
  const goNext = () => { if (step === 0) setStep(1); else if (step === 1 && validate()) setStep(2); else if (step === 2) setStep(3); };
  const reset = () => { setStep(0); setValues(initialValues); setErrors({}); setNotice(""); };
  const total = (Number(values.quantity) || 0) * (Number(values.unitPrice) || 0);
  return <div className="min-h-screen bg-background text-foreground"><a className="skip-link" href="#main-content">Skip to main content</a><header className="border-b border-border bg-card"><div className="mx-auto flex min-h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8"><Button variant="ghost" className="brand-mark" onClick={reset} aria-label="Ledgerly home"><span className="brand-dot" />Ledgerly</Button><div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex"><span className="user-avatar">MA</span><span>Marvin Kaunda</span></div></div></header><div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row"><aside className="border-b border-border bg-secondary/50 lg:min-h-[calc(100vh-4rem)] lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r"><nav className="grid grid-cols-4 gap-2 overflow-hidden p-2 lg:block lg:space-y-1 lg:overflow-visible lg:p-6" aria-label="Main navigation">{nav.map((item, index) => { const Icon = navIcons[index]; return <Button key={item} variant={activeNav === item ? "secondary" : "ghost"} className="min-h-11 min-w-0 flex-1 shrink justify-center gap-1 px-1 text-xs flex-col lg:w-full lg:flex-none lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:text-sm" onClick={() => { setActiveNav(item); setNotice(item === "Invoices" ? "" : `${item} is ready to explore.`); }} aria-current={activeNav === item ? "page" : undefined}><Icon className="size-[18px]" />{item}</Button>; })}</nav></aside><main id="main-content" className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-8"><div className="mx-auto max-w-5xl">{notice && <p className="mb-5 rounded-lg border border-border bg-accent px-4 py-3 text-sm text-accent-foreground" role="status">{notice}</p>}<><BenchmarkStepper currentStep={step} onStepChange={(nextStep) => setStep(nextStep as typeof step)} /><Workflow step={step} /></>{step === 0 && <Overview onStart={goNext} />}{step === 1 && <Details values={values} errors={errors} update={update} onBack={() => setStep(0)} onNext={goNext} />}{step === 2 && <Review values={values} total={total} onBack={() => setStep(1)} onNext={goNext} />}{step === 3 && <Complete customer={values.customer} onReset={reset} />}</div></main></div></div>;
}

function Workflow({ step }: { step: Step }) { const labels = ["Invoices", "Invoice details", "Review and schedule", "Invoice scheduled"]; return <div className="hidden" aria-hidden="true"><ol className="workflow mb-8" aria-label="Invoice creation progress">{labels.map((label, index) => <li key={label} className={index <= step ? "is-current" : ""}><span className="step-number">{index < step ? <CheckIcon className="size-4" /> : index + 1}</span><span className="hidden sm:block">{label}</span></li>)}</ol></div>; }

function Overview({ onStart }: { onStart: () => void }) { return <section aria-labelledby="overview-title"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><h1 id="overview-title" className="page-title">Invoices</h1><p className="mt-2 max-w-xl text-muted-foreground">Track drafts, sent invoices, and overdue balances.</p></div><Button size="lg" onClick={onStart}><PlusIcon className="size-5" />New invoice</Button></div><div className="grid gap-4 sm:grid-cols-3">{[["Outstanding", "$48,240"], ["Due soon", "8"], ["Overdue", "3"]].map(([label, value]) => <Card key={label}><CardContent className="p-6"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p></CardContent></Card>)}</div><Card className="mt-6"><CardHeader><CardTitle>Recent invoices</CardTitle></CardHeader><CardContent className="p-0"><Table className="invoice-table table-fixed"><TableHeader><TableRow><TableHead>Customer</TableHead><TableHead>Invoice</TableHead><TableHead>Amount and due date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{records.map(([title, detail, meta, status]) => <TableRow key={detail}><TableCell><div className="font-medium">{title}</div></TableCell><TableCell className="font-mono text-sm text-muted-foreground">{detail}</TableCell><TableCell className="text-muted-foreground">{meta}</TableCell><TableCell><Badge variant={status === "Overdue" ? "destructive" : "secondary"}>{status}</Badge></TableCell></TableRow>)}</TableBody></Table></CardContent></Card></section>; }

function FieldError({ children }: { children?: string }) { return children ? <p className="mt-2 text-sm text-destructive" role="alert">{children}</p> : null; }
function Details({ values, errors, update, onBack, onNext }: { values: FormValues; errors: Partial<Record<keyof FormValues, string>>; update: (field: keyof FormValues, value: string) => void; onBack: () => void; onNext: () => void }) { return <section aria-labelledby="details-title"><div className="mb-8"><h1 id="details-title" className="page-title">Invoice details</h1><p className="mt-2 text-muted-foreground">Choose the customer and add billable work.</p></div><Card><CardContent className="p-6 sm:p-8"><form onSubmit={(event) => { event.preventDefault(); onNext(); }} noValidate><div className="grid gap-6 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="customer">Customer <span className="text-destructive">*</span></Label><Select value={values.customer} onValueChange={(value) => { if (value) update("customer", value); }}><SelectTrigger className="min-h-11 text-base sm:text-sm" id="customer" aria-invalid={Boolean(errors.customer)}><SelectValue placeholder="Select a customer" /></SelectTrigger><SelectContent>{["Northwind Studio", "Fieldwork Labs", "Pine & Co."].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select><FieldError>{errors.customer}</FieldError></div><div className="space-y-2"><Label htmlFor="service">Service <span className="text-destructive">*</span></Label><Input className="min-h-11 text-base sm:text-sm" id="service" value={values.service} onChange={(event) => update("service", event.target.value)} placeholder="Product design sprint" aria-invalid={Boolean(errors.service)} /><FieldError>{errors.service}</FieldError></div><div className="space-y-2"><Label htmlFor="quantity">Quantity <span className="text-destructive">*</span></Label><Input className="min-h-11 text-base sm:text-sm" id="quantity" type="number" min="1" inputMode="numeric" value={values.quantity} onChange={(event) => update("quantity", event.target.value)} placeholder="1" aria-invalid={Boolean(errors.quantity)} /><FieldError>{errors.quantity}</FieldError></div><div className="space-y-2"><Label htmlFor="unit-price">Unit price <span className="text-destructive">*</span></Label><Input className="min-h-11 text-base sm:text-sm" id="unit-price" type="number" min="0.01" step="0.01" inputMode="decimal" value={values.unitPrice} onChange={(event) => update("unitPrice", event.target.value)} placeholder="8400" aria-invalid={Boolean(errors.unitPrice)} /><FieldError>{errors.unitPrice}</FieldError></div></div><div className="mt-6 space-y-2"><Label htmlFor="note">Internal note <span className="font-normal text-muted-foreground">(optional)</span></Label><Textarea className="text-base sm:text-sm" id="note" value={values.note} onChange={(event) => update("note", event.target.value)} placeholder="Add context for your team" rows={4} /></div><div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between"><Button type="button" variant="outline" size="lg" onClick={onBack}><ArrowLeftIcon className="size-4" />Back</Button><Button type="submit" size="lg">Review invoice<ArrowRightIcon className="size-4" /></Button></div></form></CardContent></Card></section>; }

function Review({ values, total, onBack, onNext }: { values: FormValues; total: number; onBack: () => void; onNext: () => void }) { return <section aria-labelledby="review-title"><div className="mb-8"><h1 id="review-title" className="page-title">Review and schedule</h1><p className="mt-2 text-muted-foreground">Check the client and line item values before scheduling.</p></div><div className="grid gap-6 lg:grid-cols-[1fr_300px]"><Card><CardHeader><CardTitle>Invoice summary</CardTitle></CardHeader><CardContent className="space-y-5"><div className="flex justify-between gap-4 border-b border-border pb-4"><span className="text-muted-foreground">Customer</span><strong>{values.customer}</strong></div><div className="grid gap-4 border-b border-border pb-4 sm:grid-cols-3"><div><p className="text-sm text-muted-foreground">Service</p><p className="mt-1 font-medium">{values.service}</p></div><div><p className="text-sm text-muted-foreground">Quantity</p><p className="mt-1 font-medium">{values.quantity}</p></div><div><p className="text-sm text-muted-foreground">Unit price</p><p className="mt-1 font-medium">${Number(values.unitPrice).toLocaleString()}</p></div></div>{values.note && <div><p className="text-sm text-muted-foreground">Internal note</p><p className="mt-1 whitespace-pre-wrap">{values.note}</p></div>}<div className="flex items-center justify-between pt-2 text-lg"><span>Total</span><strong>${total.toLocaleString()}</strong></div></CardContent></Card><Card className="h-fit bg-accent"><CardContent className="p-6"><p className="text-sm font-medium text-accent-foreground">Scheduled delivery</p><p className="mt-2 text-sm leading-6 text-accent-foreground/80">This invoice will be sent tomorrow at 09:00.</p></CardContent></Card></div><div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between"><Button variant="outline" size="lg" onClick={onBack}><ArrowLeftIcon className="size-4" />Back to details</Button><Button size="lg" onClick={onNext}>Schedule invoice<ArrowRightIcon className="size-4" /></Button></div></section>; }

function Complete({ customer, onReset }: { customer: string; onReset: () => void }) { return <section className="mx-auto max-w-2xl" aria-labelledby="complete-title"><Card><CardContent className="p-6 text-center sm:p-12"><div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground"><CheckIcon className="size-7" /></div><h1 id="complete-title" className="page-title mt-6">Invoice scheduled</h1><p className="mx-auto mt-3 max-w-md text-muted-foreground">INV-2049 will be sent to {customer} tomorrow at 09:00.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button size="lg" onClick={onReset}><RefreshDoubleIcon className="size-4" />Create another invoice</Button><Button variant="outline" size="lg" onClick={() => window.print()}>View invoice</Button></div></CardContent></Card></section>; }
