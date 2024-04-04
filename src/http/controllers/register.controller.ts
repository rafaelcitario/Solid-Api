import { encryptPassword } from '@src/lib/crypto';
import { prisma } from '@src/lib/prisma';
import { usersSchemaValidateBody } from '@src/lib/zod';
import { FastifyReply, FastifyRequest } from 'fastify';


export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = usersSchemaValidateBody.parse(request.body);
  if (name === undefined) throw Error('please, insert your name');
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: encryptPassword(password)
    }
  });
  return reply.status(201).send();
}