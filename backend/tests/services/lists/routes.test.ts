import { TestApp, getTestServer } from '../../helpers';
import { expect, it } from '@jest/globals';

import express from 'express';
import request from 'supertest';

let testApp: TestApp;
let server: express.Application;

describe('services/lists/routes', () => {
  beforeAll(async () => {
    testApp = getTestServer();
    server = testApp.server;
  });

  describe('get ../api/lists', () => {
    it('resolves correctly', async () => {
      const response = await request(server).get('/api/lists');
      expect(response.status).toBe(200);
    });
  });

  describe('post ../api/lists', () => {
    it('resolves correctly', async () => {
      const response = await request(server).post('/api/lists');
      expect(response.status).toBe(200);
    });
  });

  describe('put ../api/lists', () => {
    it('resolves correctly', async () => {
      const response = await request(server).put('/api/lists');
      expect(response.status).toBe(200);
    });
  });

  describe('delete ../api/lists', () => {
    it('resolves correctly', async () => {
      const response = await request(server).del('/api/lists');
      expect(response.status).toBe(200);
    });
  });
});
