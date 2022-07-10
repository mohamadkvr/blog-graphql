import {signup, signIn} from '../../controllers/userItems/user'
export const userMutation = {
  signUp: async (parent:any,data:any,context:any) => {
     return await signup(data.data)
  },
  signIn: async (parent, {data},context) => {
     return await signIn(data) 
  }
}
