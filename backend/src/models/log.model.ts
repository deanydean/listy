import { ObjectId } from 'mongodb'

export interface LogModel {
  _id?: ObjectId
  timestamp: number
  status: number
  method: string
  endpoint: string
  params: any
}
