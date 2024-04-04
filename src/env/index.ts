import 'dotenv/config';
import { envSchema } from '@src/lib/zod';


const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.log('Some enviroment variables is not found.', _env.error.format());
  throw new Error('Some enviroment variables is not found.');
}

export const ENV = _env.data;
