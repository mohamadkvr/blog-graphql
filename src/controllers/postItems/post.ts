import postServiceObj from '../../models/post'
import postValidation from './validation'
import { ValidationError ,AuthenticationError} from 'apollo-server-express'
import {Me} from '../../utills/token'

type Pagination = {page:number,limit:number}
type Filter = {field:string, value:string}

export const postsFind = async(pagination:Pagination,filter:Filter) => {
    return await postServiceObj.find(pagination,filter)
}


export const postFind = async(id) => {
    return await postServiceObj.fineOne(id)
}

export const createPost = async (data, me:Me) => {
   //check authorization
    if(!me) throw new AuthenticationError("authorization faild")
    
   //validation data
   const checkVaildation = await postValidation.validate(data)
   if(checkVaildation.error) {
       throw new ValidationError(checkVaildation.error.message)
   }

   //create a post
   const date = new Date()
   data.createAt = date.toISOString()

   return await postServiceObj.createPost(data)
}

