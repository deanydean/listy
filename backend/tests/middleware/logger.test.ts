import * as middleware from '../../src/middleware/logger';

import { expect, jest, test } from '@jest/globals';

import express from 'express';
import { getTestServer } from '../helpers';
import request from 'supertest';

jest.spyOn(middleware, 'createLog');

let server: express.Application;

describe('logger middleware', () => {
  const validEndpoint = '/test';
  const invalidEndpoint = '/this-does-not-exist';

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(async () => {
    server = getTestServer();
  });

  test('requests to valid routes are logged', async () => {
    await request(server).get(validEndpoint);
    expect(middleware.createLog).toHaveBeenCalled();
  });

  test('requests to invalid routes are logged', async () => {
    await request(server).get(invalidEndpoint);
    expect(middleware.createLog).toHaveBeenCalled();
  });
});
