import { Router } from 'express'
import { createProduct, getProduct } from '../controllers/product.controller'

export const productRouter: Router = Router()

productRouter.get('/', getProduct)
productRouter.get('/:id', getProduct)
productRouter.post('/', createProduct)
