import * as middleware from '../../src/middleware/error-handler';

import { TestApp, getTestServer } from '../helpers';
import { expect, it, jest } from '@jest/globals';

import { createContainer } from '../../src/container';
import express from 'express';
import { getMockRes } from '@jest-mock/express';
import request from 'supertest';

let testApp: TestApp;
let server: express.Application;

jest.mock('../../src/services/lists/repository');
const { res } = getMockRes();
const router = express.Router();
const container = createContainer(router, true);
const service = container.services.lists;

describe('error-handler fallback middleware', () => {
  const endpoint = '/api/lists';

  beforeAll(async () => {
    testApp = getTestServer();
    server = testApp.server;
  });

  it('responds with the default message, "ERROR!", if one isn\'t provided', async () => {
    const err: middleware.IError = { status: 500 };
    middleware.handleError(err, res);
    expect(res.send).toBeCalledWith('ERROR!');
  });

  it('responds with the provided error message if one is provided', async () => {
    const err: middleware.IError = { status: 500, message: 'test' };
    middleware.handleError(err, res);
    expect(res.send).toBeCalledWith('test');
  });

  it('handles unexpected errors', async () => {
    jest.spyOn(service.repository, 'getLists').mockImplementationOnce(() => {
      throw new Error();
    });
    const response = await request(server).get(endpoint);
    expect(response.status).toEqual(500);
  });
});
