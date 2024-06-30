// global.d.ts
interface Window {
  bootstrap: any;
}

// custom.d.ts
interface ImportMeta {
  readonly env: Record<string, string | undefined>;
}
