import { Request, Response, NextFunction } from 'express'
import { verifyJWT } from '../utils/jwt'
import { logger } from '../utils/logger'

const deserializedToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, '')
  if (!accessToken) {
    logger.error('ERR: auth - register = access token not found')
    return res.status(401).send({
      status: false,
      statusCode: 401,
      message: 'access token not found'
    })
  }

  const token: any = verifyJWT(accessToken)
  if (token.decoded) {
    logger.info('success deserialized token')
    res.locals.user = token.decoded
    return next()
  }

  if (token.expired) {
    logger.error('ERR: auth - register = access token expired')
    return res.status(401).send({
      status: false,
      statusCode: 401,
      message: 'access token expired'
    })
  }

  return next()
}

export default deserializedToken
