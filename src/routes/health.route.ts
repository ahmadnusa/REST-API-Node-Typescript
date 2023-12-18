import { Router, Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export const healthRouter: Router = Router()

healthRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('health check')
  res.status(200).send('Hello World!')
})
