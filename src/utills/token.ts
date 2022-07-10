import jwt from 'jsonwebtoken'
import {configData} from '../config/config'
import { AuthenticationError } from 'apollo-server-express';
import { Request } from 'express';


export const generateToken = async (id: string):Promise<string> => {
  let token:string;
  try {
    token = jwt.sign({ id }, configData.privateKey);
  } catch (error) {
    throw error
  }
  return token
}

export const verifyToken = async (req:Request) => {

   const token = req.header['x-token'] || req.get("Authorization")

   const result = {me:null}
   let userId;
   try {
    userId = jwt.verify(token, configData.privateKey);
    result.me = userId
   } catch (error) {
    result.me = null
   }
   return result
}

export type Me = {id:string,iat:number}