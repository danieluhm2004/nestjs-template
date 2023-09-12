import { config } from 'dotenv';

config();
export const EVM = {
  /** WEB_PORT */
  WEB_PORT: Number(process.env.WEB_PORT) || 3001,
  /** Database */
  DATABASE_URL: process.env.DATABASE_URL as string,
};
