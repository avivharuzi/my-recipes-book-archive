import * as chalk from 'chalk';
import * as express from 'express';

import { afterMiddlewares, beforeMiddlewares } from './middlewares';
import { connect } from './database';
import { routes } from './routes';

export const start = async (port: number, hostname: string): Promise<void> => {
  await connect();
  const app = express();
  await beforeMiddlewares(app);
  await routes(app);
  await afterMiddlewares(app);
  app.listen(port, hostname, (): void => {
    console.log(chalk.blue(`Server running at: http://${hostname}:${port}`));
  });
};
