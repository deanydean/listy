import * as express from 'express';

import { App } from '../src/app';

export function getTestServer(): express.Application {
  const useTestDb = true;
  return new App(useTestDb).server;
}
