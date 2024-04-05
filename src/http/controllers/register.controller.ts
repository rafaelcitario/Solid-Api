import { usersSchemaValidateBody } from '@src/lib/zod';
import { UserRepository } from '@src/repository/createUser.repository';
import { RegisterUser } from '@src/services/register';
import { FastifyReply, FastifyRequest } from 'fastify';


export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = usersSchemaValidateBody.parse(request.body);

  const userRepository = new UserRepository();
  const createUser = new RegisterUser(userRepository);

  try {
    await createUser.execute({ name, email, password });
  } catch (error) {
    return reply.status(409).send();
  }
  return reply.status(201).send();
}