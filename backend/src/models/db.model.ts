import * as mongo from 'mongodb';

import { Response } from './response.model';

// TODO: getRecordById().
// TODO: getAllRecords() should be paginated, or an additional paginated get should be created.
export interface Db {
  readonly _db: MockDb | mongo.Db;
  editRecordById: <T extends mongo.Document>(
    table: string,
    id: string,
    object: T
  ) => Promise<Response<string>>;
  deleteRecordById: (table: string, id: string) => Promise<Response<string>>;
  createRecord: <T extends mongo.Document>(
    table: string,
    object: T
  ) => Promise<Response<string>>;
  getAllRecords: <T>(table: string) => Promise<Response<T[]>>;
}

export type MockDb = null;
