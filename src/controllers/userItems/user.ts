import userServiceObj from '../../models/user'
import {signUpSchema, signInSchema} from './validation'
import { ValidationError } from 'apollo-server-express';
import {generatePassHash, comparePassword} from '../../utills/password'
import {generateToken} from '../../utills/token'

export const signup = async (data:{name: string, email:string, password:string}):Promise<boolean> => {
  
      //valdation inputs

      const checkVaildation = await signUpSchema.validate(data)
      if (checkVaildation.error) {
          throw new ValidationError(checkVaildation.error.message)
      }

      //return error if  user already exist
      try {
        const existUser = await userServiceObj.findOne({email:data.email})
        if (existUser) {
        const error = new Error('this user already exist') 
        throw error
        }
      } catch (error) {
        throw error
      }

      //hash password
      const hash = await generatePassHash(data.password)
      data.password = hash

      //add data to database
      return await userServiceObj.createUser(data)
    
}

export const signIn = async (data:{email:string, password:string}):Promise<string> => {
      //validation input
      const checkVaildation = signInSchema.validate(data)
      if(checkVaildation.error) {
        throw new ValidationError('validation faild')
      }
      //get exist user
      const user = await userServiceObj.findOne({email:data.email})
      if(!user) {
        throw new ValidationError("not valid email or password")
      }
      //compare password
  
      const resultComparePass = await comparePassword(data.password, user.password)
      if(!resultComparePass) {
        throw new ValidationError("not valid email or password")
      }

      //generate token
      const token = await generateToken(user._id)
      return token
}