import * as express from 'express';

import { App } from '../src/app';
import { DependencyContainer } from '../src/container';

export type TestApp = {
  server: express.Application;
  container: DependencyContainer;
};

export function getTestServer(): TestApp {
  const useTestDb = true;
  const app = new App(useTestDb);

  return { server: app.server, container: app.container };
}
