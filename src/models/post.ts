import {client, dbName} from "../config/mongo"
import { ObjectId } from "mongodb"
import { object } from "joi"

const postSchema = client.db(dbName).collection('posts')
type Pagination = {page:number,limit:number}
type Filter = {field:string,value:string}

interface Post {
  id? : string,
  title:string,
  userId: string
  body: string
  likes?: string[]
  dislike?: string[]
  description: string
  view?: number
  createAt: Date
}

interface CreatePost {
  title:string
  body:string
  description: string
}
export class PostServices{
  async createPost(data:CreatePost) :Promise<boolean>  {
    try {
      await postSchema.insertOne(data)
    } catch (error) {
      throw error
    }
    return true
  }
   
  async update (id:string,data):Promise<boolean> {
    try {
     await postSchema.updateOne({_id:new ObjectId(id)},{$set: data}) 
    } catch (error) {
      throw error
    }
    return true
  }
  async find( pagination:Pagination,filter:Filter) {
    let limit = 10
    let skip  = 0
    
    //paginaiton 
    if(pagination && pagination.page > 1) {
        limit = pagination.limit || 10
        skip = limit * pagination.page
    }

    //query 
    let option = {}
    if(filter && filter.field == "title"){
        option[filter.field] = {$regex: filter.value}
    }
    return await postSchema.find({...option})
    .sort({createAt:-1})
    .skip(skip)
    .limit(limit)
    .toArray()

  }

  async fineOne(id) {
    return await postSchema.findOne({_id:new ObjectId(id)})
  }
}

