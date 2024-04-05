import { Prisma } from '@prisma/client';
import { prisma } from '@src/lib/prisma';


export class UserRepository {
  async create(data: Prisma.UserCreateInput) {
    await prisma.user.create({
      data,
    });
  }
}