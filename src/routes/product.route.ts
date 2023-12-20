import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct
} from '../controllers/product.controller'
import { requireAdmin } from '../middleware/auth'

export const productRouter: Router = Router()

productRouter.get('/', getProduct)
productRouter.get('/:id', getProduct)
productRouter.post('/', requireAdmin, createProduct)
productRouter.put('/:id', requireAdmin, updateProduct)
productRouter.delete('/:id', requireAdmin, deleteProduct)
