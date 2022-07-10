import {client, dbName} from '../config/mongo'
import { ObjectId } from 'mongodb'
import user from '../schema/user'
const userSchema = client.db(dbName).collection('users')
interface User {
  id?: string
  name?: string
  lastName?: string
  gender?: "male" | "female"
  email?: string
  degreeOfEducation?: string
  field?: string[]
  birthDate?: Date
}


class UserService {
  async createUser(data:User):Promise<boolean> {
    try {
      await userSchema.insertOne(data)
    } catch (error) {
      throw error
    }
    return true
  }

  async findOne(data:User): Promise<any> {
    return await userSchema.findOne({email:data.email})
  }

  async findOneAndId(id: string): Promise<any> {
    return await userSchema.findOne({_id:new ObjectId(id)})
  }

  async updateUser(id: string, data:User): Promise<boolean> {
     try {
      await userSchema.updateOne({_id:id},{$set: {data}})
     } catch (error) {
      throw error
     } 
     return false
  }

}

export default new UserService()