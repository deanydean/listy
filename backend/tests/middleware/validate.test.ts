import { TestApp, getTestServer } from '../helpers';

import express from 'express';
import { it } from '@jest/globals';
import request from 'supertest';

let testApp: TestApp;
let server: express.Application;

describe('validate middleware', () => {
  const endpoint = '/api/lists';

  beforeAll(async () => {
    testApp = getTestServer();
    server = testApp.server;
  });

  it('responds with a 200 code if there are no validation errors', async () => {
    const body = { title: 'List Title', items: [] };
    await request(server).post(endpoint).send(body).expect(200);
  });

  it('responds with a 400 error if there are validation errors', async () => {
    const body = {};
    await request(server).post(endpoint).send(body).expect(400);
  });
});
