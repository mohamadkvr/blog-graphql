import postController from '../../controllers/postItems/post'
import {Me} from '../../utills/token'
export const postMutation = {

  createPost: async(parent,{data}, {me}:{me:Me}) => {
    await postController.createPost(data, me)
    return true
  },
  updatePost: async(parent,{data,id},{me}:{me:Me}) => {
    await postController.updatePost(data,id,me)
    return true
  }
}