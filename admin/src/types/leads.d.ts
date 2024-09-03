export type Sort = "ascending" | "descending" | "most-recent";

export type DateFilter =
  | "today"
  | "yesterday"
  | "in-7-days"
  | "in-a-month"
  | "in-a-year"
  | "custom-date-range";

export type DateRangeProps = [string, string] | null;
