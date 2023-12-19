import UserType from '../types/user.type'
import UserModel from '../models/user.model'

export const createUser = async (payload: UserType) => {
  return await UserModel.create(payload)
}
export const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email })
}
