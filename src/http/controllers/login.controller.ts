import { encryptPassword } from '@src/lib/crypto';
import { prisma } from '@src/lib/prisma';
import { usersSchemaValidateBody } from '@src/lib/zod';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function loginUserController(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = usersSchemaValidateBody.parse(request.body);
  reply.send(
    await prisma.user.findMany({
      where: {
        email,
        password_hash: encryptPassword(password)
      }
    })
  );
}