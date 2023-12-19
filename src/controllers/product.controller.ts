import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import {
  addProductToDB,
  deleteProductById,
  getProductById,
  getProductFromDB,
  updateProductById
} from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4()
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error(`ERR: product - create = ${error.message}`)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }
  try {
    await addProductToDB(value)
    logger.info('success add new product')
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'success add new product'
    })
  } catch (error: any) {
    logger.error(`ERR: product - create = ${error.message}`)
    return res.status(500).send({
      status: false,
      statusCode: 500,
      message: error.message
    })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  if (id) {
    const product: any = await getProductById(id)
    if (!product) {
      logger.error('ERR: product not found')
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'product not found'
      })
    }
    logger.info('product found')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'product found',
      data: product
    })
  } else {
    const products: any = await getProductFromDB()
    logger.info('success get all product')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'success get all product',
      data: products
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = updateProductValidation(req.body)
  if (error) {
    logger.error(`ERR: product - update = ${error.message}`)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }
  try {
    const result = await updateProductById(id, value)
    if (!result) {
      logger.error('ERR: product not found')
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'product not found'
      })
    }
    logger.info('success update product')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'success update product'
    })
  } catch (error: any) {
    logger.error(`ERR: product - update = ${error.message}`)
    return res.status(500).send({
      status: false,
      statusCode: 500,
      message: error.message
    })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req
  try {
    const result = await deleteProductById(id)
    if (!result) {
      logger.error('ERR: product not found')
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'product not found'
      })
    }
    logger.info('success delete product')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'success delete product'
    })
  } catch (error: any) {
    logger.error(`ERR: product - delete = ${error.message}`)
    return res.status(500).send({
      status: false,
      statusCode: 500,
      message: error.message
    })
  }
}
