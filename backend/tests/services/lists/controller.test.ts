import { expect, it, jest } from '@jest/globals';
import { getMockReq, getMockRes } from '@jest-mock/express';

import { List } from '../../../src/models/list.model';
import { Response } from '../../../src/models/response.model';
import { createContainer } from '../../../src/container';
import express from 'express';

const { res, next } = getMockRes();
const req = getMockReq();

jest.mock('../../../src/services/lists/repository');
const router = express.Router();
const container = createContainer(router, true);
const service = container.services.lists;

describe('services/lists/controller', () => {
  describe('getListsHandler', () => {
    it('responds with status code 200 and the value from getLists() if successful', async () => {
      const list: List = {
        title: 'test',
        items: [],
      };
      const lists = new Response<List[]>({ status: 200, data: [list] });
      jest.spyOn(service.repository, 'getLists').mockResolvedValueOnce(lists);
      await service.controller.getListsHandler(req, res, next);
      expect(service.repository.getLists).toHaveBeenCalled();
      expect(res.status).toBeCalledWith(200);
      expect(res.send).toBeCalledWith([{ items: [], title: 'test' }]);
    });

    it('handles errors', async () => {
      jest.spyOn(service.repository, 'getLists').mockImplementationOnce(() => {
        throw new Error('Something went wrong.');
      });
      await service.controller.getListsHandler(req, res, next);
      expect(next).toBeCalledWith(new Error('Something went wrong.'));
    });
  });

  describe('createListHandler', () => {
    it('responds with a 200 status code if successful', async () => {
      jest.spyOn(service.repository, 'createList');
      await service.controller.createListHandler(req, res, next);
      expect(service.repository.createList).toHaveBeenCalled();
      expect(res.status).toBeCalledWith(200);
    });

    it('handles errors', async () => {
      jest
        .spyOn(service.repository, 'createList')
        .mockImplementationOnce(() => {
          throw new Error('Something went wrong.');
        });
      await service.controller.createListHandler(req, res, next);
      expect(next).toBeCalledWith(new Error('Something went wrong.'));
    });
  });

  describe('editListHandler', () => {
    it('responds with status code 200 and a success message if successful', async () => {
      jest.spyOn(service.repository, 'editList');
      await service.controller.editListHandler(req, res, next);
      expect(service.repository.editList).toHaveBeenCalled();
      expect(res.status).toBeCalledWith(200);
    });

    it('handles errors', async () => {
      jest.spyOn(service.repository, 'editList').mockImplementationOnce(() => {
        throw new Error('Something went wrong.');
      });
      await service.controller.editListHandler(req, res, next);
      expect(next).toBeCalledWith(new Error('Something went wrong.'));
    });
  });

  describe('deleteListHandler', () => {
    it('responds with status code 200 and a success message if successful', async () => {
      jest.spyOn(service.repository, 'deleteList');
      await service.controller.deleteListHandler(req, res, next);
      expect(service.repository.deleteList).toHaveBeenCalled();
      expect(res.status).toBeCalledWith(200);
    });

    it('handles errors', async () => {
      jest
        .spyOn(service.repository, 'deleteList')
        .mockImplementationOnce(() => {
          throw new Error('Something went wrong.');
        });
      await service.controller.deleteListHandler(req, res, next);
      expect(next).toBeCalledWith(new Error('Something went wrong.'));
    });
  });
});
