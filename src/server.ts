import { app } from './app';
import { ENV } from './env';

app.listen({ port: ENV.PORT, host: ENV.HOST }).then(() => {
  console.log(`server is running at ${ENV.HOST}:${ENV.PORT}`);
});
