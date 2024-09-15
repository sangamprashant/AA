// global.d.ts
interface Window {
  bootstrap: any;
}

// custom.d.ts
interface ImportMeta {
  readonly env: Record<string, string | undefined>;
}

// razorpay.d.ts
interface Window {
  Razorpay: any;
}
