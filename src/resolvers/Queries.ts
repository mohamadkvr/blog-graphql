import { userQuery } from "./user/userQuery";
import { postQuery } from "./post/postQuery";

export const Query = {
  ...userQuery,
  ...postQuery
};