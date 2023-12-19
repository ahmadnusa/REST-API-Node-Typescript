import { Application, Router } from 'express'
import { healthRouter } from './health.route'
import { productRouter } from './product.route'
import { authRouter } from './auth.route'

const _routes: Array<[string, Router]> = [
  ['/health', healthRouter],
  ['/product', productRouter],
  ['/auth', authRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
