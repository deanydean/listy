import { NextFunction, Request, Response } from 'express';

import { Controller } from '../../models/controller.model';
import { ListModel } from '../../models/list.model';
import { ListsRepository } from './repository';

export class ListsController implements Controller<ListsRepository> {
  readonly repo: ListsRepository;

  constructor(repo: ListsRepository) {
    this.repo = repo;
  }

  async getListsHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await this.repo.getLists();
      res.status(response.status).send(response.data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async createListHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const newList: ListModel = req.body;
      const response = await this.repo.createList(newList);
      res.status(response.status).send(response.data);
    } catch (error) {
      next(error);
    }
  }

  async editListHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const newList: ListModel = req.body;
      const response = await this.repo.editList(id, newList);
      res.status(response.status).send(response.data);
    } catch (error) {
      next(error);
    }
  }

  async deleteListHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const response = await this.repo.deleteList(id);
      res.status(response.status).send(response.data);
    } catch (error) {
      next(error);
    }
  }
}
