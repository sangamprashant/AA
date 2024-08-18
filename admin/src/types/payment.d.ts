export interface PaymentNotes {
  name: string;
  mobileNumber: string;
  email: string;
  purpose: string;
  class: string;
}

export interface AcquirerData {
  rrn: string;
  upi_transaction_id: string;
}

export interface UpiDetails {
  vpa: string;
}

export interface CardDetails {
  network: string;
  last4: string;
}

export interface PaymentData {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  invoice_id: string | null;
  international: boolean;
  method: string;
  amount_refunded: number;
  refund_status: string | null;
  captured: boolean;
  description: string | null;
  card_id: string | null;
  bank: string | null;
  wallet: string | null;
  vpa: string | null;
  email: string;
  contact: string;
  notes: PaymentNotes;
  fee: number;
  tax: number;
  error_code: string | null;
  error_description: string | null;
  error_source: string | null;
  error_step: string | null;
  error_reason: string | null;
  acquirer_data: AcquirerData;
  created_at: number;
  upi: UpiDetails;
  card: CardDetails;
}

export interface PaymentDB {
  _id: string;
  name: string;
  mobileNumber: string;
  email: string;
  purpose: string;
  amount: string;
  selectClass: string;
  orderCreationId: string;
  receipt: string;
  status: string;
  __v: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface PaymentResponse {
  success: boolean;
  payment_: PaymentData;
  paymentdb: PaymentDB;
}

// Union type for dataSource
export type Payment = RazorpayPayment | DBPayment;

export interface RazorpayPayment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  notes: RazorpayPaymentNotes;
}

export interface RazorpayPaymentNotes {
  name: string;
  email: string;
  purpose: string;
  class: string;
  mobileNumber: string;
}

export interface DBPayment {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  purpose: string;
  amount: number;
  status: string;
  selectClass: string;
  orderCreationId: string;
  razorpayPaymentId: string;
}
