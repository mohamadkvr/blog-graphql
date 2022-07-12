import userController from '../../controllers/userItems/user'
export const userMutation = {
  signUp: async (parent:any,data:any,context:any) => {
     return await userController.signup(data.data)
  },
  signIn: async (parent, {data},context) => {
     return await userController.signIn(data) 
  }
}
