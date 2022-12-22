import { ListItemModel } from './list-item.model';
import { ObjectId } from 'mongodb';

export interface ListModel {
  _id?: ObjectId;
  title: string;
  items: ListItemModel[];
}
