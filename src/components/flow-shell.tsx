"use client";

import Link from "next/link";
import { type ChangeEvent, type FormEvent, useState } from "react";
import type { BenchmarkFlow, FlowField } from "@/benchmark/types";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  FileTextIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@/components/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";

type FlowShellProps = { flow: BenchmarkFlow };
type Values = Record<string, string>;

const navIcons = [HomeIcon, InboxIcon, FileTextIcon, UsersIcon];
const nextSteps = [
  "The new record is created.",
  "The owner receives the next action.",
  "The activity log records the change.",
];
const internalNoteKey = "Internal note";
const workflowFormId = "workflow-form";

function SidebarNav({ flow }: FlowShellProps) {
  return (
    <nav aria-label={`${flow.product} navigation`} className="grid gap-1">
      {flow.nav.map((item, index) => {
        const Icon = navIcons[index] ?? HomeIcon;
        const isCurrent = item === flow.activeNav;
        return (
          <span
            aria-current={isCurrent ? "page" : undefined}
            className={isCurrent
              ? "flex h-10 items-center gap-3 rounded-md bg-primary px-3 text-sm text-primary-foreground"
              : "flex h-10 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground"}
            key={item}
          >
            <Icon aria-hidden="true" className="size-4" />
            {item}
          </span>
        );
      })}
    </nav>
  );
}

function UserProfile() {
  return (
    <div className="mt-auto flex items-center gap-3 border-t border-border pt-5">
      <Avatar className="size-9"><AvatarFallback>MC</AvatarFallback></Avatar>
      <div className="grid gap-0.5">
        <strong className="text-sm font-medium">Maya Chen</strong>
        <span className="text-xs text-muted-foreground">Workspace admin</span>
      </div>
    </div>
  );
}

function Sidebar({ flow }: FlowShellProps) {
  return (
    <aside className="hidden border-r border-border bg-card lg:flex lg:h-screen lg:flex-col lg:p-5">
      <Link className="mb-8 flex items-center gap-3 text-sm font-semibold" href="/">
        <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
          {flow.product.slice(0, 1)}
        </span>
        {flow.product}
      </Link>
      <SidebarNav flow={flow} />
      <UserProfile />
    </aside>
  );
}

function MobileHeader({ flow }: FlowShellProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
      <Link className="flex items-center gap-2 text-sm font-semibold" href="/">
        <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
          {flow.product.slice(0, 1)}
        </span>
        {flow.product}
      </Link>
      <Button asChild size="sm" variant="outline"><Link href="/">All flows</Link></Button>
    </header>
  );
}

function Stepper({ currentStep, flow }: FlowShellProps & { currentStep: number }) {
  return (
    <ol aria-label="Workflow progress" className="grid grid-cols-4 gap-2">
      {flow.steps.map((step, index) => (
        <li
          aria-current={index === currentStep ? "step" : undefined}
          className={index <= currentStep ? "text-foreground" : "text-muted-foreground"}
          key={step.title}
        >
          <span className={index <= currentStep ? "mb-2 block h-1 rounded-full bg-primary" : "mb-2 block h-1 rounded-full bg-border"} />
          <span className="block truncate text-xs">{step.title}</span>
        </li>
      ))}
    </ol>
  );
}

function PageHeader({ step }: { step: BenchmarkFlow["steps"][number] }) {
  return (
    <header className="flex items-start justify-between gap-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{step.title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{step.description}</p>
      </div>
      <Button asChild className="hidden lg:inline-flex" variant="outline"><Link href="/">All flows</Link></Button>
    </header>
  );
}

function Stats({ stats }: { stats: BenchmarkFlow["stats"] }) {
  return (
    <section aria-label="Current totals" className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="grid gap-2 p-5">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <strong className="text-2xl font-semibold tracking-tight">{stat.value}</strong>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function RecentRecord({ record }: { record: BenchmarkFlow["records"][number] }) {
  return (
    <article className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-4">
      <Avatar className="size-9"><AvatarFallback>{record.title.slice(0, 1)}</AvatarFallback></Avatar>
      <div className="min-w-0">
        <strong className="block truncate text-sm font-medium">{record.title}</strong>
        <span className="mt-1 block truncate text-xs text-muted-foreground">
          {record.detail} · {record.meta}
        </span>
      </div>
      <Badge variant="secondary">{record.status}</Badge>
    </article>
  );
}

function RecentWork({ records }: { records: BenchmarkFlow["records"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent work</CardTitle>
        <CardDescription>Items that need review or follow-up.</CardDescription>
      </CardHeader>
      <CardContent className="divide-y divide-border">
        {records.map((record) => (
          <RecentRecord key={record.title} record={record} />
        ))}
      </CardContent>
    </Card>
  );
}

function Overview({ flow }: FlowShellProps) {
  return <div className="grid gap-4"><Stats stats={flow.stats} /><RecentWork records={flow.records} /></div>;
}

type FieldProps = {
  field: FlowField;
  onChange: (value: string) => void;
  value: string;
};

function FieldControl({ field, id, onChange, value }: FieldProps & { id: string }) {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  if (field.type !== "select") {
    return <Input id={id} onChange={handleChange} placeholder={field.placeholder} required type={field.type ?? "text"} value={value} />;
  }

  return (
    <NativeSelect id={id} onChange={handleChange} required value={value}>
      <option disabled value="">{field.placeholder}</option>
      {field.options?.map((option) => <option key={option}>{option}</option>)}
    </NativeSelect>
  );
}

function Field(props: FieldProps) {
  const id = `field-${props.field.label.toLowerCase().replaceAll(" ", "-")}`;
  return (
    <label className="grid gap-2 text-sm font-medium" htmlFor={id}>
      {props.field.label}
      <FieldControl {...props} id={id} />
    </label>
  );
}

type FormScreenProps = FlowShellProps & {
  errors: boolean;
  onAdvance: () => void;
  onChange: (label: string, value: string) => void;
  values: Values;
};

function FormScreen({ errors, flow, onAdvance, onChange, values }: FormScreenProps) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAdvance();
  }

  return (
    <form id={workflowFormId} onSubmit={submit}>
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Required details</CardTitle>
          <CardDescription>Add the information needed to complete this work.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {flow.fields.map((field) => (
              <Field field={field} key={field.label} onChange={(value) => onChange(field.label, value)} value={values[field.label] ?? ""} />
            ))}
          </div>
          <label className="grid gap-2 text-sm font-medium" htmlFor="internal-note">
            Internal note <span className="font-normal text-muted-foreground">Optional</span>
            <Textarea
              id="internal-note"
              onChange={(event) => onChange(internalNoteKey, event.target.value)}
              placeholder="Add context for the team"
              rows={4}
              value={values[internalNoteKey] ?? ""}
            />
          </label>
          {errors && <p className="text-sm font-medium text-destructive" role="alert">Complete every required field to continue.</p>}
        </CardContent>
      </Card>
    </form>
  );
}

function ReviewDetails({ flow, values }: FlowShellProps & { values: Values }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review details</CardTitle>
        <CardDescription>Confirm these values before completing the workflow.</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="divide-y divide-border">
          {flow.fields.map((field) => (
            <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4" key={field.label}>
              <dt className="text-sm text-muted-foreground">{field.label}</dt>
              <dd className="m-0 text-sm font-medium">{values[field.label]}</dd>
            </div>
          ))}
          {values[internalNoteKey] && (
            <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-sm text-muted-foreground">{internalNoteKey}</dt>
              <dd className="m-0 text-sm font-medium">{values[internalNoteKey]}</dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
}

function NextSteps({ flow }: FlowShellProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>After confirmation</CardTitle>
        <CardDescription>{flow.product} records the change and updates the workspace.</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="grid gap-4 text-sm text-muted-foreground">
          {nextSteps.map((step) => (
            <li className="flex gap-3" key={step}>
              <CheckCircleIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-success" />
              {step}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

function ReviewScreen({ flow, values }: FlowShellProps & { values: Values }) {
  return <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.7fr)]"><ReviewDetails flow={flow} values={values} /><NextSteps flow={flow} /></div>;
}

function WorkflowSummary({ name }: { name: string }) {
  return (
    <div className="mt-6 grid w-full grid-cols-2 gap-4 rounded-lg border border-border bg-secondary p-4 text-left text-sm">
      <span className="text-muted-foreground">Workflow</span>
      <strong className="text-right font-medium">{name}</strong>
      <span className="text-muted-foreground">Status</span>
      <strong className="text-right font-medium">Complete</strong>
    </div>
  );
}

function CompletionScreen({ flow }: FlowShellProps) {
  const completion = flow.steps.at(-1);
  return (
    <Card className="mx-auto max-w-2xl">
      <CardContent className="grid justify-items-center px-6 py-12 text-center sm:px-12">
        <span className="grid size-14 place-items-center rounded-full bg-success/10 text-success">
          <CheckCircleIcon aria-hidden="true" className="size-7" />
        </span>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">{completion?.title}</h1>
        <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">{completion?.description}</p>
        <WorkflowSummary name={flow.name} />
      </CardContent>
    </Card>
  );
}

function useWorkflow(flow: BenchmarkFlow) {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState(false);
  const [values, setValues] = useState<Values>({});
  const isLast = currentStep === flow.steps.length - 1;
  const step = flow.steps[currentStep];

  function advance() {
    if (currentStep === 1 && flow.fields.some((field) => !values[field.label]?.trim())) {
      setErrors(true);
      return;
    }
    setErrors(false);
    if (isLast) {
      setValues({});
      setCurrentStep(0);
      return;
    }
    setCurrentStep(currentStep + 1);
  }

  function back() {
    setErrors(false);
    setCurrentStep((value) => Math.max(0, value - 1));
  }

  function updateValue(label: string, value: string) {
    setErrors(false);
    setValues((current) => ({ ...current, [label]: value }));
  }

  return { advance, back, currentStep, errors, isLast, step, updateValue, values };
}

function Screen({ currentStep, errors, flow, onAdvance, onChange, values }: FormScreenProps & { currentStep: number }) {
  if (currentStep === 0) return <Overview flow={flow} />;
  if (currentStep === 1) return <FormScreen errors={errors} flow={flow} onAdvance={onAdvance} onChange={onChange} values={values} />;
  if (currentStep === 2) return <ReviewScreen flow={flow} values={values} />;
  return <CompletionScreen flow={flow} />;
}

export function FlowShell({ flow }: FlowShellProps) {
  const workflow = useWorkflow(flow);
  const nextLabel = workflow.isLast ? "Return to overview" : workflow.step.action;
  return (
    <div className="min-h-screen bg-background text-foreground" data-flow={flow.slug}>
      <MobileHeader flow={flow} />
      <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
        <Sidebar flow={flow} />
        <main className="min-w-0 p-4 sm:p-7 lg:p-10">
          <div className="mx-auto grid max-w-6xl gap-7">
            {!workflow.isLast && <PageHeader step={workflow.step} />}
            <Stepper currentStep={workflow.currentStep} flow={flow} />
            <Screen currentStep={workflow.currentStep} errors={workflow.errors} flow={flow} onAdvance={workflow.advance} onChange={workflow.updateValue} values={workflow.values} />
            <footer className="sticky bottom-0 flex justify-between gap-3 border-t border-border bg-background/95 py-4 backdrop-blur">
              <Button disabled={workflow.currentStep === 0} onClick={workflow.back} variant="outline">
                <ArrowLeftIcon aria-hidden="true" className="size-4" />Back
              </Button>
              <Button
                form={workflow.currentStep === 1 ? workflowFormId : undefined}
                onClick={workflow.currentStep === 1 ? undefined : workflow.advance}
                type={workflow.currentStep === 1 ? "submit" : "button"}
              >
                {nextLabel}<ArrowRightIcon aria-hidden="true" className="size-4" />
              </Button>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
