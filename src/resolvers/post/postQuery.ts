import {postsFind, postFind} from '../../controllers/postItems/post'
export const postQuery = {
  posts: async (parent,{filter,pagination},ctx) => {
     return await postsFind(pagination, filter)
   },
  post: async(parent,{id},ctx) => {
    return await postFind(id)
  }   
}