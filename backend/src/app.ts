import express, { Request, Response } from 'express';

import { createContainer } from './container';
import helmet from 'helmet';
import { logger } from './middleware/logger';

export class App {
  readonly server;
  readonly container;
  private readonly router;

  constructor(useTestDb: boolean = false) {
    this.server = express();
    this.router = express.Router();
    this.container = createContainer(useTestDb);

    this.setHeaders();
    this.registerMiddleware();
    this.registerFallbacks();
    this.registerRoutes();
  }

  setHeaders(): void {
    this.server.disable('x-powered-by');
  }

  registerMiddleware(): void {
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use(logger);
  }

  registerFallbacks(): void {}

  registerRoutes(): void {
    this.server.get('/test', async (req: Request, res: Response) => {
      res.status(200).send('Server is running!');
    });

    this.server.use('/api', this.router);
  }
}
