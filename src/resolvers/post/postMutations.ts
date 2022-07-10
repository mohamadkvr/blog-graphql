import {createPost} from '../../controllers/postItems/post'
import {Me} from '../../utills/token'
export const postMutation = {

  createPost: async(parent,{data}, {me}:{me:Me}) => {
    await createPost(data, me)
    return true
  }

}