import { appRoutes } from './http/routes/app.routes';
import fastify from './lib/fastify';

export const app = fastify;

app.register(appRoutes);