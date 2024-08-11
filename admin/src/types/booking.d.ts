// types/booking.d.ts
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
    state: string;
    assignedEmployee: string;
    allocationDate: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface BookingTableProps {
    type: string;
    employeeId: string;
  }