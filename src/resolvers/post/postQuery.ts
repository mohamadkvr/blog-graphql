import postController from '../../controllers/postItems/post'
export const postQuery = {
  posts: async (parent,{filter,pagination},ctx) => {
     return await postController.postsFind(pagination, filter)
   },
  post: async(parent,{id},ctx) => {
    return await postController.postFind(id)
  }   
}