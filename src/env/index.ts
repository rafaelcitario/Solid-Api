import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  HOST: z.coerce.string().default('0.0.0.0'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.log('Some enviroment variables is not found.', _env.error.format());
  throw new Error('Some enviroment variables is not found.');
}

export const ENV = _env.data;
