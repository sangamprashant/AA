// config.ts

interface Config {
  SERVER: string;
}

const apiUrl: string = import.meta.env.VITE_SERVER || '';

export const config: Config = {
  SERVER: apiUrl
};
