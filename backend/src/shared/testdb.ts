import * as mongo from 'mongodb';

import { Db, MockDb } from '../models/db.model';

import { Response } from '../models/response.model';

export class TestDb implements Db {
  readonly _db: MockDb;

  constructor() {
    this._db = null;
  }

  async editRecordById(
    table: string,
    id: string,
    changes: Object
  ): Promise<Response<string>> {
    return new Response({ status: 200, data: { table, id, changes } });
  }

  async deleteRecordById(table: string, id: string): Promise<Response<string>> {
    return new Response({ status: 200, data: { table, id } });
  }

  async createRecord<T extends mongo.Document>(
    table: string,
    object: T
  ): Promise<Response<string>> {
    return new Response({ status: 200, data: { table, object } });
  }

  async getAllRecords<T>(table: string): Promise<Response<T[]>> {
    return new Response({ status: 200, data: { table } });
  }
}
