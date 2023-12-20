import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user
  if (!user) {
    logger.error('ERR: require - user = access token invalid')
    return res.status(403).send({
      status: false,
      statusCode: 403,
      message: 'access token invalid'
    })
  }
  return next()
}

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user
  if (!user || user._doc.role !== 'admin') {
    logger.error('ERR: requere - admin = admin access only')
    return res.status(403).send({
      status: false,
      statusCode: 403,
      message: 'admin access only'
    })
  }
  return next()
}
