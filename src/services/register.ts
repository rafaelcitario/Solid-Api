import { encryptPassword } from '@src/lib/crypto';
import { IPrismaUsersRepository } from '@src/repository/IRepositories/prismaUsers.repository';

interface RegisterUserBodyParams {
  name: string,
  email: string,
  password: string;
}

export class RegisterUser {
  private userRepository;
  constructor(userRepository: IPrismaUsersRepository) {
    this.userRepository = userRepository;
  }
  async execute({ name, email, password }: RegisterUserBodyParams) {
    const encrypedPassword = encryptPassword(password);

    await this.userRepository.create({
      name,
      email,
      password_hash: encrypedPassword
    });
  }
}