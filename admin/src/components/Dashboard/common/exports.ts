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
  "#e0f7fa", // New leads
  "#ffebee", // Attempt to contacted (1)
  "#fff3e0", // Attempt to contacted (2)
  "#e8f5e9", // Connected
  "#f3e5f5", // Prospect
  "#ffecb3", // Hot leads
  "#c8e6c9", // Payment Received
  "#ef9a9a", // Not Interested
];
