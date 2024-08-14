// types/booking.d.ts
export type StateHistory = {
  state:
    | "New leads"
    | "Attempt to contacted (1)"
    | "Attempt to contacted (2)"
    | "Connected"
    | "Prospect"
    | "Hot leads"
    | "Payment Received"
    | "Not Interested";
  comment?: string;
  updatedBy: string; // Assuming this references a User ID
  updatedAt: Date;
};

export type File = {
  description?: string;
  url?: string;
  uploadDate: Date;
};

export type Files = {
  documents?: File[];
  receipts?: File[];
};

export type Booking = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phoneNumber: string;
  selectedClass: string;
  time?: string;
  doc: Date;
  state:
    | "New leads"
    | "Attempt to contacted (1)"
    | "Attempt to contacted (2)"
    | "Connected"
    | "Prospect"
    | "Hot leads"
    | "Payment Received"
    | "Not Interested";
  stateHistory?: StateHistory[];
  assignedEmployee: string; // Assuming this references a User ID
  files?: Files;
  approvedBYHigher?: boolean;
  allocationDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export interface BookingTableProps {
  type: string;
  employeeId: string;
}
