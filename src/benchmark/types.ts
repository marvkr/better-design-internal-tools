export type FlowField = {
  label: string;
  placeholder: string;
  type?: "text" | "email" | "date" | "number" | "select";
  options?: string[];
};

export type FlowRecord = {
  title: string;
  detail: string;
  meta: string;
  status: string;
};

export type FlowStep = {
  title: string;
  description: string;
  action: string;
};

export type BenchmarkFlow = {
  slug: string;
  name: string;
  product: string;
  category: string;
  audience: string;
  job: string;
  nav: string[];
  activeNav: string;
  stats: Array<{ label: string; value: string }>;
  records: FlowRecord[];
  fields: FlowField[];
  steps: FlowStep[];
};
