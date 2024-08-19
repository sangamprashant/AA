export interface AttendanceRecord {
    date: string; // ISO date string with time component
    status:
      | "early"
      | "present"
      | "absent"
      | "late"
      | "half-day-leave"
      | "off"
      | "holiday"
      | "training"
      | "remote-work"
      | "meeting"
      | "unpaid-leave";
    details?: string;
  }