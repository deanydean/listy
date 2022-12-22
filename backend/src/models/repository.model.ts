import { Db } from './db.model';

export interface Repository {
  readonly db: Db;
}
