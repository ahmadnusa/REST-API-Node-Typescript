import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct
} from '../controllers/product.controller'

export const productRouter: Router = Router()

productRouter.get('/', getProduct)
productRouter.get('/:id', getProduct)
productRouter.post('/', createProduct)
productRouter.put('/:id', updateProduct)
productRouter.delete('/:id', deleteProduct)
