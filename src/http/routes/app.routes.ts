import { loginUserController } from '@src/http/controllers/login.controller';
import { registerUserController } from '@src/http/controllers/register.controller';
import { FastifyInstance } from 'fastify';

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.post('/users', registerUserController);
  app.post('/login', loginUserController);
}