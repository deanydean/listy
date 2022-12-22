import { Db } from './models/db.model';
import { ListsController } from './services/lists/controller';
import { ListsRepository } from './services/lists/repository';
import { ListsRoutes } from './services/lists/routes';
import { MongoDb } from './shared/mongodb';
import { TestDb } from './shared/testdb';
import express from 'express';

export interface DependencyContainer {
  database: Db;
  services: {
    lists: {
      repository: ListsRepository;
      controller: ListsController;
      routes: ListsRoutes;
    };
  };
}

export function createContainer(
  router: express.Router,
  useTestDb: boolean = false
): DependencyContainer {
  const db = useTestDb ? new TestDb() : new MongoDb();

  // Service components
  const listsRepository = new ListsRepository(db);
  const listsController = new ListsController(listsRepository);
  const listsRoutes = new ListsRoutes(router, listsController);

  return {
    database: db,
    services: {
      lists: {
        repository: listsRepository,
        controller: listsController,
        routes: listsRoutes,
      },
    },
  };
}
