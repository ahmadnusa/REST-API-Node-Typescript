import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validations/product.validation'
import { getProductFromDB } from '../services/product.service'

interface ProductType {
  product_id: string
  name: string
  price: number
  size: string
}

export const getProduct = async (req: Request, res: Response) => {
  const products: any = await getProductFromDB()

  const {
    params: { name }
  } = req

  if (name) {
    logger.info(`get product with name = ${name}`)

    const filterProduct = products.filter((product: ProductType) => {
      return product.name === name
    })

    if (filterProduct.length === 0) {
      logger.error('ERR: product - get = product not found')
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
      data: filterProduct[0]
    })
  }

  logger.info('success get all product')
  return res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'success get all product',
    data: products
  })
}

export const createProduct = (req: Request, res: Response) => {
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('ERR: product - create = ', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
      data: {}
    })
  }
  logger.info('add new product')
  return res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'add product success',
    data: value
  })
}