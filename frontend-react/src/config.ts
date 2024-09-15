// config.ts

interface Config {
  SERVER: string;
  RAZORPAY_KEY_ID: string;
}

const apiUrl: string = import.meta.env.VITE_SERVER || "";

export const config: Config = {
  SERVER: apiUrl,
  RAZORPAY_KEY_ID: import.meta.env.VITE_RAZORPAY_KEY || "",
};
