import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  HOST: z.coerce.string().default('0.0.0.0'),
});

export const usersSchemaValidateBody = z.object({
  name: z.string(),
  email: z.string(),
  password: z.coerce.string().min(6)
});

