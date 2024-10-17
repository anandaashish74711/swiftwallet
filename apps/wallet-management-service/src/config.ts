// src/config.ts
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  PAYMENT_PROVIDER_API: process.env.PAYMENT_PROVIDER_API,
  PAYMENT_PROVIDER_KEY: process.env.PAYMENT_PROVIDER_KEY,
};
