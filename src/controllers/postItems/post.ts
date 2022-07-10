import postServiceObj from '../../models/post'
import userServiceObj from '../../models/user'
import { ObjectId } from 'mongodb'
import {createPostSchema, updatePostSchema} from './validation'
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
   const checkVaildation = await createPostSchema.validate(data)
   if(checkVaildation.error) {
       throw new ValidationError(checkVaildation.error.message)
   }

   //create a post
   const date = new Date()
   data.createAt = date.toISOString()
   data.userId = new ObjectId(me.id)

   return await postServiceObj.createPost(data)
}

export const updatePost = async(data,id,me:Me)=> {
    //check authorization and get user
    if(!me) throw new AuthenticationError('authorization failed')
    const user = await userServiceObj.findOneAndId(me.id)
    if(!user) throw new AuthenticationError('authorization faild!!!')

    const post = await postServiceObj.fineOne(id)
    if(!post) throw new ValidationError('no post with this id')
    console.log(user._id)
    console.log(post.userId)
    //check is userid and post.userid same
    if(post.userId.toString() !== user._id.toString()) throw new ValidationError('you are not author of this post')

    return await postServiceObj.update(id,data)
}