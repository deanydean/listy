import { Db } from '../../models/db.model';
import { ListModel } from '../../models/list.model';
import { Repository } from '../../models/repository.model';
import { Response } from '../../models/response.model';

export class ListsRepository implements Repository {
  readonly db: Db;

  constructor(database: Db) {
    this.db = database;
  }

  getLists(): Promise<Response<ListModel[]>> {
    return this.db.getAllRecords('lists');
  }

  createList(newList: ListModel): Promise<Response<string>> {
    return this.db.createRecord('lists', newList);
  }

  editList(id: string, updatedList: ListModel): Promise<Response<string>> {
    return this.db.editRecordById('lists', id, updatedList);
  }

  deleteList(id: string): Promise<Response<string>> {
    return this.db.deleteRecordById('lists', id);
  }
}
