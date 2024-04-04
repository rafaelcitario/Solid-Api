import { encryptPassword } from '@src/lib/crypto';
import { prisma } from '@src/lib/prisma';

interface RegisterUserBodyParams {
  name: string,
  email: string,
  password: string;
}

export async function registerUserUseCase({ name, email, password }: RegisterUserBodyParams): Promise<void> {
  const emailAReadyExists = await prisma.user.findUnique({
    where: {
      email,
    }
  });

  if (emailAReadyExists) {
    throw new Error('Email already exists');
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: encryptPassword(password)
    }
  });
}