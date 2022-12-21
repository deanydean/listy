import * as mongo from 'mongodb'

import { Db } from '../models/db.model'
import { Response } from '../models/response.model'

export class MongoDb implements Db {
  readonly _db: mongo.Db

  constructor () {
    const client = new mongo.MongoClient(process.env.DB_URI ?? '')
    client
      .connect()
      .then(() => console.info('Connected to mongodb successfully.'))
      .catch((err) => console.error(err))

    this._db = client.db(process.env.DB_NAME)
  }

  async getRecordById<T>(table: string, id: string): Promise<Response<T>> {
    try {
      const collection = this._db.collection(table)
      const query = { _id: new mongo.ObjectId(id) }
      const result = (await collection.findOne(query)) as T
      return new Response({ status: 200, data: result })
    } catch (err) {
      console.error(err)
      return new Response({
        status: 404,
        data: 'No record exists with that id.',
        error: err
      })
    }
  }

  async editRecordById (
    table: string,
    id: string,
    changes: Object
  ): Promise<Response<string>> {
    try {
      const collection = this._db.collection(table)
      const query = { _id: new mongo.ObjectId(id) }
      const result = await collection.updateOne(query, { $set: changes })

      if (result.modifiedCount > 0) {
        return new Response({
          status: 200,
          data: `Successfully updated record in ${table} with id ${id}.`
        })
      }

      return new Response({
        status: 304,
        data: 'No changes made.'
      })
    } catch (err) {
      console.error(err)
      return new Response({ status: 400, data: 'Bad request.', error: err })
    }
  }

  async deleteRecordById (table: string, id: string): Promise<Response<string>> {
    try {
      const collection = this._db.collection(table)
      const query = { _id: new mongo.ObjectId(id) }
      const result = await collection.deleteOne(query)

      if (result.deletedCount > 0) {
        return new Response({
          status: 202,
          data: `Successfully removed record with id ${id} from ${table}.`
        })
      }

      return new Response({
        status: 400,
        data: `Failed to remove record with id ${id} from ${table}.`
      })
    } catch (err) {
      console.error(err)
      return new Response({
        status: 500,
        data: 'Something unexpected happened.',
        error: err
      })
    }
  }

  async createRecord<T extends mongo.Document>(
    table: string,
    object: T
  ): Promise<Response<string>> {
    try {
      const collection = this._db.collection(table)
      const result = await collection.insertOne(object)

      if (result.insertedId !== null) {
        return new Response({
          status: 200,
          data: `Successfully created a new document in ${table} with id ${result.insertedId.toString()}.`
        })
      }
      return new Response({
        status: 500,
        data: 'Failed to create new record.'
      })
    } catch (err) {
      console.error(err)
      return new Response({ status: 400, data: 'Bad request.', error: err })
    }
  }

  async getAllRecords<T>(table: string): Promise<Response<T[]>> {
    try {
      const collection = this._db.collection(table)
      const result = (await collection.find({}).toArray()) as T[]
      return new Response({ status: 200, data: result })
    } catch (err) {
      console.error(err)
      return new Response({
        status: 500,
        data: 'Something unexpected happened.',
        error: err
      })
    }
  }
}
