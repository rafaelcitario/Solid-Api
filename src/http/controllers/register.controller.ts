import { usersSchemaValidateBody } from '@src/lib/zod';
import { registerUserUseCase } from '@src/services/register';
import { FastifyReply, FastifyRequest } from 'fastify';


export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = usersSchemaValidateBody.parse(request.body);

  try {
    await registerUserUseCase({ name, email, password });
  } catch (error) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}