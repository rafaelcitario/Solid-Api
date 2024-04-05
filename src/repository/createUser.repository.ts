import { Prisma } from '@prisma/client';
import { prisma } from '@src/lib/prisma';
import { IPrismaUsersRepository } from './IRepositories/prismaUsers.repository';
export class UserRepository implements IPrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
}