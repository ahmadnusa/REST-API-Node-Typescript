import { logger } from '../utils/logger'
import ProductModel from '../models/product.model'
import ProductType from '../types/product.type'

export const addProductToDB = async (payload: ProductType) => {
  return await ProductModel.create(payload)
}

export const getProductFromDB = async () => {
  try {
    const products = await ProductModel.find({}).exec()
    return products
  } catch (err: any) {
    logger.error('cannot get data from DB')
    logger.error(err)
  }
}

export const getProductById = async (id: string) => {
  return await ProductModel.findOne({ product_id: id }).exec()
}

export const updateProductById = async (id: string, payload: ProductType) => {
  return await ProductModel.findOneAndUpdate({ product_id: id }, payload, {
    new: true
  }).exec()
}

export const deleteProductById = async (id: string) => {
  return await ProductModel.findOneAndDelete({ product_id: id }).exec()
}
