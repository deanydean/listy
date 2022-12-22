import { Db } from '../../models/db.model';
import { List } from '../../models/list.model';
import { Repository } from '../../models/repository.model';
import { Response } from '../../models/response.model';

export class ListsRepository implements Repository {
  readonly db: Db;

  constructor(database: Db) {
    this.db = database;
  }

  getLists(): Promise<Response<List[]>> {
    return this.db.getAllRecords('lists');
  }

  createList(newList: List): Promise<Response<string>> {
    return this.db.createRecord('lists', newList);
  }

  editList(id: string, updatedList: List): Promise<Response<string>> {
    return this.db.editRecordById('lists', id, updatedList);
  }

  deleteList(id: string): Promise<Response<string>> {
    return this.db.deleteRecordById('lists', id);
  }
}
