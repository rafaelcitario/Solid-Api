import { Prisma, User } from '@prisma/client';

export interface IPrismaUsersRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>;
}