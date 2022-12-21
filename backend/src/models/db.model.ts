import * as mongo from 'mongodb'

import { Response } from './response.model'

export interface Db {
  readonly _db: MockDb | mongo.Db
  getRecordById: <T>(table: string, id: string) => Promise<Response<T>>
  editRecordById: <T extends mongo.Document>(
    table: string,
    id: string,
    object: T
  ) => Promise<Response<string>>
  deleteRecordById: (table: string, id: string) => Promise<Response<string>>
  createRecord: <T extends mongo.Document>(
    table: string,
    object: T
  ) => Promise<Response<string>>
  getAllRecords: <T>(table: string) => Promise<Response<T[]>>
}

export type MockDb = null
