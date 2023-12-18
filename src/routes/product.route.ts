import { Router } from 'express'
import { createProduct, getProduct } from '../controllers/product.controller'

export const productRouter: Router = Router()

productRouter.get('/', getProduct)
productRouter.get('/:name', getProduct)
productRouter.post('/', createProduct)
