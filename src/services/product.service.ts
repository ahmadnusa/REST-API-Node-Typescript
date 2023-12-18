import { logger } from '../utils/logger'
import productModel from '../models/product.model'

export const getProductFromDB = async () => {
  try {
    const products = await productModel.find({}).exec()
    return products
  } catch (err: any) {
    logger.error('cannot get data from DB')
    logger.error(err)
  }
}
