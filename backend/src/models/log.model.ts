import { ObjectId } from 'mongodb';

export interface Log {
  _id?: ObjectId;
  timestamp: number;
  status: number;
  method: string;
  endpoint: string;
  params: any;
}
