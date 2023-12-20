import { Request, Response } from 'express'
import {
  createSessionValidation,
  createUserValidation,
  refreshSessionValidation
} from '../validations/auth.validaion'
import { v4 as uuid4 } from 'uuid'
import { logger } from '../utils/logger'
import { createUser, findUserByEmail } from '../services/auth.service'
import { checkPassword, hashing } from '../utils/hashing'
import { signJWT, verifyJWT } from '../utils/jwt'

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
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }
}

export const createSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body)
  if (error) {
    logger.error(`ERR: create - session = ${error.message}`)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }
  try {
    const user: any = await findUserByEmail(value.email)
    if (!user) {
      logger.error('ERR: create - session = user not found')
      return res.status(422).send({
        status: false,
        statusCode: 422,
        message: 'user not found'
      })
    }
    const isPasswordMatch = checkPassword(value.password, user.password)
    if (!isPasswordMatch) {
      logger.error('ERR: create - session = invalid email or password')
      return res.status(422).send({
        status: false,
        statusCode: 422,
        message: 'invalid email or password'
      })
    }
    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })
    const refreshToken = signJWT({ ...user }, { expiresIn: '1y' })
    logger.info('login success')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'login success',
      data: { accessToken, refreshToken }
    })
  } catch (error: any) {
    logger.error(`ERR: create - session = ${error.message}`)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }
}

export const refreshSession = async (req: Request, res: Response) => {
  const { error, value } = refreshSessionValidation(req.body)
  if (error) {
    logger.error(`ERR: refresh - session = ${error.message}`)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }

  try {
    const { decoded } = verifyJWT(value.refreshToken)
    const user = await findUserByEmail(decoded._doc.email)
    if (!user) {
      logger.error('ERR: refresh - session = user not found')
      return res.status(422).send({
        status: false,
        statusCode: 422,
        message: 'user not found'
      })
    }
    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })
    logger.info('refresh token success')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'refresh token success',
      data: { accessToken }
    })
  } catch (error: any) {
    logger.error(`ERR: refresh - session = ${error.message}`)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }
}
