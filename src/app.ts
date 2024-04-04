import { encryptPassword } from './lib/crypto';
import fastify from './lib/fastify';
import { prisma } from './lib/prisma';
import { usersSchemaValidateBody } from './lib/zod';

export const app = fastify;


app.post('/users', async (request, reply) => {

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
});

app.post('/login', async (request, reply) => {
  const { email, password } = usersSchemaValidateBody.parse(request.body);
  reply.send(
    await prisma.user.findMany({
      where: {
        email,
        password_hash: encryptPassword(password)
      }
    })
  );
});