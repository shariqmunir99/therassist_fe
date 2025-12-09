import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string().url().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(1),
  DATABASE_URL: z.string().url().optional(),
});

export function validateEnv() {
  try {
    return envSchema.parse({
      API_URL: process.env.API_URL,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      DATABASE_URL: process.env.DATABASE_URL,
    });
  } catch (error) {
    console.error('Environment validation failed:', error);
    throw new Error('Invalid environment variables');
  }
}

export const env = {
  apiUrl: process.env.API_URL || 'http://localhost:3001',
  nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  nextAuthSecret: process.env.NEXTAUTH_SECRET,
  databaseUrl: process.env.DATABASE_URL,
};
