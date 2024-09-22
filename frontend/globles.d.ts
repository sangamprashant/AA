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

// Declare the Bootstrap module to prevent TypeScript errors
declare module "bootstrap/dist/js/bootstrap.bundle.min.js" {
  // You can define types here for specific exports if needed
  export const Carousel: any;
  export const Modal: any;
  export const Tooltip: any;
  // Add more exports as required
}
