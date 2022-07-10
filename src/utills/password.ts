import bcrypt from 'bcryptjs'

export const generatePassHash = async (password:string):Promise<string> => {
  let hash:string;
  try {
    const salt = bcrypt.genSaltSync(10)
    hash = bcrypt.hashSync(password, salt)
  } catch (error) {
    throw error
  }
 return hash
}

export const comparePassword = async (passoword:string, hash:string): Promise<boolean> => {
  return bcrypt.compareSync(passoword, hash)
}