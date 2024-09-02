export interface SessionDates {
  year: number;
  month: number;
}

export interface User {
  _id: string;
  role: "admin" | "manager" | "employee" | "teacher";
  name: string | null;
  email: string;
  createdAt: Date;
}
