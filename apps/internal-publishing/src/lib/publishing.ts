export type PageValues = {
  title: string;
  collection: string;
  owner: string;
  reviewDate: string;
  note: string;
};

export type PageErrors = Partial<Record<keyof PageValues, string>>;

export function validatePageValues(values: PageValues): PageErrors {
  const errors: PageErrors = {};
  if (!values.title.trim()) errors.title = "Enter a page title.";
  if (!values.collection) errors.collection = "Choose a collection.";
  if (!values.owner) errors.owner = "Choose an owner.";
  if (!values.reviewDate) errors.reviewDate = "Choose a review date.";
  return errors;
}
