import { expect, test } from '@jest/globals';

import { ListModel } from '../../../src/models/list.model';
import { Response } from '../../../src/models/response.model';
import { createContainer } from '../../../src/container';

const container = createContainer(true);
const service = container.services.lists;

const newList: ListModel = {
  title: 'test',
  items: [],
};

describe('services/lists/controller', () => {
  describe('ListsRepository', () => {
    describe('getLists()', () => {
      test('returns a Response object', async () => {
        const value = await service.repository.getLists();
        expect(value).toBeInstanceOf(Response);
        expect(value.status).toBe(200);
      });
    });

    describe('createList()', () => {
      test('returns a Response object', async () => {
        const value = await service.repository.createList(newList);
        expect(value).toBeInstanceOf(Response);
        expect(value.status).toBe(200);
      });
    });

    describe('editList()', () => {
      test('returns a Response object', async () => {
        const value = await service.repository.editList('fake_id', newList);
        expect(value).toBeInstanceOf(Response);
        expect(value.status).toBe(200);
      });
    });

    describe('deleteList()', () => {
      test('returns a Response object', async () => {
        const value = await service.repository.deleteList('fake_id');
        expect(value).toBeInstanceOf(Response);
        expect(value.status).toBe(200);
      });
    });
  });
});
