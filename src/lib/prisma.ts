import { PrismaClient } from '@prisma/client';
import { ENV } from '@src/env';
export const prisma = new PrismaClient({
  log: ENV.NODE_ENV === 'dev' ? ['query'] : []
});