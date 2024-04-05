import { encryptPassword } from '@src/lib/crypto';
import { prisma } from '@src/lib/prisma';
import { UserRepository } from '@src/repository/createUser.repository';

interface RegisterUserBodyParams {
  name: string,
  email: string,
  password: string;
}

export async function registerUserUseCase({ name, email, password }: RegisterUserBodyParams): Promise<void> {
  const emailIsAlready = await prisma.user.findUnique({
    where: {
      email,
    }
  });

  if (emailIsAlready) {
    throw new Error('This email is already exists!');
  }

  const user = new UserRepository();

  await user.create({
    name,
    email,
    password_hash: encryptPassword(password)
  });
}