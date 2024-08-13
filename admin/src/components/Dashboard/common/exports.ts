export enum BookingStatus {
  NEW_LEADS = "New leads",
  ATTEMPT_CONTACTED_1 = "Attempt to contacted (1)",
  ATTEMPT_CONTACTED_2 = "Attempt to contacted (2)",
  CONNECTED = "Connected",
  PROSPECT = "Prospect",
  HOT_LEADS = "Hot leads",
  PAYMENT_RECEIVED = "Payment Received",
  NOT_INTERESTED = "Not Interested",
}

export const statusOptions = [
  "New leads",
  "Attempt to contacted (1)",
  "Attempt to contacted (2)",
  "Connected",
  "Prospect",
  "Hot leads",
  "Payment Received",
  "Not Interested",
];

export const colors = [
  "#4c527e", // New leads
  "#741a28", // Attempt to contacted (1)
  "#6c5023", // Attempt to contacted (2)
  "#07660e", // Connected
  "#600f6c", // Prospect
  "#7c600b", // Hot leads
  "#07660b", // Payment Received
  "#820c0c", // Not Interested
];
