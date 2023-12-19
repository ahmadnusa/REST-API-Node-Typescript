import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct
} from '../controllers/product.controller'
import { requireAdmin, requireUser } from '../middleware/auth'

export const productRouter: Router = Router()

productRouter.get('/', requireUser, getProduct)
productRouter.get('/:id', requireUser, getProduct)
productRouter.post('/', requireAdmin, createProduct)
productRouter.put('/:id', requireAdmin, updateProduct)
productRouter.delete('/:id', requireAdmin, deleteProduct)
