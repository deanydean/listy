import { ListsController } from './controller';
import { Router } from 'express';
import { Routes } from '../../models/routes.model';
import express from 'express';

export class ListsRoutes implements Routes<ListsController> {
  readonly router: express.Router;
  readonly controller: ListsController;

  private routes = Router();

  constructor(router: express.Router, controller: ListsController) {
    this.router = router;
    this.controller = controller;
    this.init();
  }

  init(): void {
    // TODO: docs
    this.routes.get('/', this.controller.getListsHandler.bind(this.controller));

    // TODO: docs
    this.routes.post(
      '/',
      this.controller.createListHandler.bind(this.controller)
    );

    // TODO: docs
    this.routes.put('/', this.controller.editListHandler.bind(this.controller));

    // TODO: docs
    this.routes.delete(
      '/',
      this.controller.deleteListHandler.bind(this.controller)
    );

    this.router.use('/lists', this.routes);
  }
}
