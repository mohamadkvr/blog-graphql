import { userMutation  } from "./user/userMutation"
import { postMutation } from "./post/postMutations"
export const  Mutation = {
  ...userMutation,
  ...postMutation
}
