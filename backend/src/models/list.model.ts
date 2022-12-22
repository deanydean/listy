import { ListItem } from './list-item.model';
import { ObjectId } from 'mongodb';

export interface List {
  _id?: ObjectId;
  title: string;
  items: ListItem[];
}
