import { Db } from './models/db.model';
import { ListsController } from './services/lists/controller';
import { ListsRepository } from './services/lists/repository';
import { MongoDb } from './shared/mongodb';
import { TestDb } from './shared/testdb';

export interface DependencyContainer {
  database: Db;
  services: {
    lists: {
      repository: ListsRepository;
      controller: ListsController;
    };
  };
}

export function createContainer(
  useTestDb: boolean = false
): DependencyContainer {
  const db = useTestDb ? new TestDb() : new MongoDb();

  // Service components
  const listsRepository = new ListsRepository(db);
  const listsController = new ListsController(listsRepository);

  return {
    database: db,
    services: {
      lists: {
        repository: listsRepository,
        controller: listsController,
      },
    },
  };
}
