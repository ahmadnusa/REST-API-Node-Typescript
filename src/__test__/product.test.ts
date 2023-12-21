import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import createServer from '../utils/server'
import { addProductToDB } from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'
import { createUser } from '../services/auth.service'
import { hashing } from '../utils/hashing'

const productid = uuidv4()
const productid2 = uuidv4()
const userIDAdmin = uuidv4()
const userIDRegular = uuidv4()
const password = '123456'
const app = createServer()
const productPayload = {
  product_id: productid,
  name: 'product 1',
  price: 10000,
  size: 'M'
}
const productPayload2 = {
  product_id: productid2,
  name: 'product 2',
  price: 10000,
  size: 'M'
}
const productPayload3 = {
  product_id: productid2,
  name: 'product 3',
  price: 10000,
  size: 'M'
}
const productPayloadUpdate = {
  price: 5000000,
  size: 'L'
}
const productPayloadUpdate2 = {
  name: 'product 3',
  size: 'M'
}
const userCreate = {
  user_id: userIDRegular,
  name: 'ahmad',
  email: 'ahmad123@gmail.com',
  password: `${hashing(password)}`,
  role: 'regular'
}
const userAdminCreate = {
  user_id: userIDAdmin,
  name: 'noir',
  email: 'noir123@gmail.com',
  password: `${hashing(password)}`,
  role: 'admin'
}
const userRegular = {
  email: 'ahmad123@gmail.com',
  password: '123456'
}
const userAdmin = {
  email: 'noir123@gmail.com',
  password: '123456'
}

describe('*Product', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
    await addProductToDB(productPayload)
    await addProductToDB(productPayload3)
    await createUser(userCreate)
    await createUser(userAdminCreate)
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('--get all product ', () => {
    describe('-given the product exist', () => {
      it('should return 200 and list of product', async () => {
        const response = await supertest(app).get('/product')
        expect(response.status).toBe(200)
      })
    })
  })

  describe('--get detail product', () => {
    describe('-given the product does not exist', () => {
      it('should return 404 and empty data', async () => {
        const response = await supertest(app).get('/product/1')
        expect(response.status).toBe(404)
      })
    })
    describe('-given the product exist', () => {
      it('should return 200 and detail product data', async () => {
        const response = await supertest(app).get(`/product/${productid}`)
        expect(response.status).toBe(200)
      })
    })
  })

  describe('--create product', () => {
    describe('-if user is not logged in', () => {
      it('should return 403, request forbiden', async () => {
        const response = await supertest(app).post('/product').send(productPayload2)
        expect(response.status).toBe(403)
      })
    })
    describe('-if user is logged in as admin', () => {
      it('should return 201 and success create product', async () => {
        const { body } = await supertest(app).post('/auth/login').send(userAdmin)
        const {
          data: { accessToken }
        } = body
        const response = await supertest(app)
          .post('/product')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(productPayload2)
        expect(response.status).toBe(201)
      })
      it('should return 500 and error message if name and size is alredy exist', async () => {
        const { body } = await supertest(app).post('/auth/login').send(userAdmin)
        const {
          data: { accessToken }
        } = body
        const response = await supertest(app)
          .post('/product')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(productPayload)
        expect(response.status).toBe(500)
      })
    })
    describe('-if user is logged in as regular', () => {
      it('should return 403, request forbiden', async () => {
        const { body } = await supertest(app).post('/auth/login').send(userRegular)
        const {
          data: { accessToken }
        } = body
        const response = await supertest(app)
          .post('/product')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(productPayload2)
        expect(response.status).toBe(403)
      })
    })
  })

  describe('--update product', () => {
    describe('-if user is not logged in', () => {
      it('should return 403, request forbiden', async () => {
        const response = await supertest(app).put('/product/1').send(productPayloadUpdate)
        expect(response.status).toBe(403)
      })
    })
    describe('-if user is logged in as admin', () => {
      it('should return 200 and success update product', async () => {
        const { body } = await supertest(app).post('/auth/login').send(userAdmin)
        const {
          data: { accessToken }
        } = body
        const response = await supertest(app)
          .put(`/product/${productid}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .send(productPayloadUpdate)
        expect(response.status).toBe(200)
        const newData = await supertest(app).get(`/product/${productid}`)
        expect(newData.body.data.price).toBe(productPayloadUpdate.price)
        expect(newData.body.data.size).toBe(productPayloadUpdate.size)
      })
      it('should return 500 and error message if name and size is alredy exist', async () => {
        const { body } = await supertest(app).post('/auth/login').send(userAdmin)
        const {
          data: { accessToken }
        } = body
        const response = await supertest(app)
          .put(`/product/${productid}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .send(productPayloadUpdate2)
        expect(response.status).toBe(500)
      })
    })
    describe('-if user is logged in as regular', () => {
      it('should return 403, request forbiden', async () => {
        const { body } = await supertest(app).post('/auth/login').send(userRegular)
        const {
          data: { accessToken }
        } = body
        const response = await supertest(app)
          .put(`/product/${productid}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .send(productPayloadUpdate)
        expect(response.status).toBe(403)
      })
    })
  })

  describe('--delete product', () => {
    describe('-if user is not logged in', () => {
      it('should return 403, request forbiden', async () => {
        const response = await supertest(app).delete('/product/1')
        expect(response.status).toBe(403)
      })
    })
    describe('-if user is logged in as admin', () => {
      it('should return 200 and success delete product', async () => {
        const { body } = await supertest(app).post('/auth/login').send(userAdmin)
        const {
          data: { accessToken }
        } = body
        const response = await supertest(app)
          .delete(`/product/${productid}`)
          .set('Authorization', `Bearer ${accessToken}`)
        expect(response.status).toBe(200)
      })
    })
    describe('-if user is logged in as regular', () => {
      it('should return 403, request forbiden', async () => {
        const { body } = await supertest(app).post('/auth/login').send(userRegular)
        const {
          data: { accessToken }
        } = body
        const response = await supertest(app)
          .delete(`/product/${productid}`)
          .set('Authorization', `Bearer ${accessToken}`)
        expect(response.status).toBe(403)
      })
    })
  })
})
