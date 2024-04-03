import fastify from './lib/fastify';
import { prisma } from './lib/prisma';
import { usersSchemaValidateBody } from './lib/zod';
import { hash } from './lib/crypto';


export const app = fastify();

app.post('/users', async (request, reply) => {
  const { name, email, password } = usersSchemaValidateBody.parse(request.body);

  hash.on('readable', async () => {
    const data = await hash.read();
    if (data) {
      await prisma
        .user
        .create({
          data: {
            name,
            email,
            password_hash: data.toString('hex'),
          }
        });
    }
  });
  hash.write(password);
  hash.end();
  return reply.status(201).send();
});
