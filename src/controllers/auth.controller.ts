import { Request, Response } from 'express'
import { createUserValidation } from '../validations/auth.validaion'
import { v4 as uuid4 } from 'uuid'
import { logger } from '../utils/logger'
import { createUser } from '../services/auth.service'
import { hashing } from '../utils/hashing'

export const registerUser = async (req: Request, res: Response) => {
  req.body.user_id = uuid4()
  const { error, value } = createUserValidation(req.body)
  if (error) {
    logger.error(`ERR: auth - register = ${error.message}`)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }

  try {
    value.password = `${hashing(value.password)}`
    await createUser(value)
    logger.info('success register new user')
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'success register new user'
    })
  } catch (error: any) {
    logger.error(`ERR: auth - register = ${error.message}`)
    return res.status(409).send({
      status: false,
      statusCode: 409,
      message: error.message
    })
  }
}
