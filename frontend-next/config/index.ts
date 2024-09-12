// config.ts

interface Config {
  SERVER: string;
  RAZORPAY_KEY_ID: string;
}

const apiUrl: string = process.env.NEXT_SERVER || "";

export const config: Config = {
  SERVER: apiUrl,
  RAZORPAY_KEY_ID: process.env.NEXT_RAZORPAY_KEY || "",
};
