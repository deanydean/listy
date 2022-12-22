import { expect, it } from '@jest/globals';

import { MongoDb } from '../src/shared/mongodb';
import { TestDb } from '../src/shared/testdb';
import { createContainer } from '../src/container';
import express from 'express';

jest.mock('../src/shared/mongodb');

describe('container.ts', () => {
  describe('createContainer()', () => {
    it('creates an instance of TestDb when the argument in createContainer is true', async () => {
      const container = createContainer(express.Router(), true);
      expect(container.database).toBeInstanceOf(TestDb);
    });

    it('creates an instance of MongoDb when the argument in createContainer is false', async () => {
      const container = createContainer(express.Router(), false);
      expect(container.database).toBeInstanceOf(MongoDb);
    });

    it('creates an instance of MongoDb when the argument in createContainer is not provided', async () => {
      const container = createContainer(express.Router(), false);
      expect(container.database).toBeInstanceOf(MongoDb);
    });
  });
});
