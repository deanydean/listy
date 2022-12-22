import { Db } from './models/db.model';
import { ListsRepository } from './services/lists/repository';
import { MongoDb } from './shared/mongodb';
import { TestDb } from './shared/testdb';

export interface DependencyContainer {
  database: Db;
  services: {
    lists: {
      repository: ListsRepository;
    };
  };
}

export function createContainer(
  useTestDb: boolean = false
): DependencyContainer {
  const db = useTestDb ? new TestDb() : new MongoDb();

  return {
    database: db,
    services: {
      lists: {
        repository: new ListsRepository(db),
      },
    },
  };
}
