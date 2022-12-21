import express from 'express';
import helmet from 'helmet';

export class App {
  readonly server;
  private readonly router;

  constructor() {
    this.server = express();
    this.router = express.Router();

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
  }

  registerFallbacks(): void {
  }

  registerRoutes(): void {
    this.server.use('/api', this.router);
  }
}
