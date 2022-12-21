import * as express from 'express';

import { App } from '../src/app';

export function getTestServer(): express.Application {
  return new App().server;
}
