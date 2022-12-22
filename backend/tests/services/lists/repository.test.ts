import { expect, test } from '@jest/globals';

import { ListModel } from '../../../src/models/list.model';
import { Response } from '../../../src/models/response.model';
import { createContainer } from '../../../src/container';

const container = createContainer(true);
const repository = container.repositories.lists;

const newList: ListModel = {
  title: 'test',
  items: [],
};

describe('services/lists/controller', () => {
  describe('ListsRepository', () => {
    describe('getLists()', () => {
      test('returns a Response object', async () => {
        const value = await repository.getLists();
        expect(value).toBeInstanceOf(Response);
        expect(value.status).toBe(200);
      });
    });

    describe('createList()', () => {
      test('returns a Response object', async () => {
        const value = await repository.createList(newList);
        expect(value).toBeInstanceOf(Response);
        expect(value.status).toBe(200);
      });
    });

    describe('editList()', () => {
      test('returns a Response object', async () => {
        const value = await repository.editList('fake_id', newList);
        expect(value).toBeInstanceOf(Response);
        expect(value.status).toBe(200);
      });
    });

    describe('deleteList()', () => {
      test('returns a Response object', async () => {
        const value = await repository.deleteList('fake_id');
        expect(value).toBeInstanceOf(Response);
        expect(value.status).toBe(200);
      });
    });
  });
});
