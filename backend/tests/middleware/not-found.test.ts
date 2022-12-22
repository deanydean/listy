import * as middleware from '../../src/middleware/not-found';

import { TestApp, getTestServer } from '../helpers';
import { expect, jest, test } from '@jest/globals';

import express from 'express';
import request from 'supertest';

let testApp: TestApp;
let server: express.Application;

jest.spyOn(middleware, 'handleNotFound');

describe('not-found fallback middleware', () => {
  const endpoint = '/api/this-does-not-exist';

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(async () => {
    testApp = getTestServer();
    server = testApp.server;
  });

  test('invalid routes invoke the middleware', async () => {
    await request(server).get(endpoint);
    expect(middleware.handleNotFound).toHaveBeenCalled();
  });
});
