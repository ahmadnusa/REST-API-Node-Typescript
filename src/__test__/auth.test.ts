import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import createServer from '../utils/server'

const app = createServer()

const userRegularCreated = {
  name: 'ahmad',
  email: 'ahmad123@gmail.com',
  password: '123456'
}
const userAdminCreated = {
  name: 'noir',
  email: 'noir123@gmail.com',
  password: '123456'
}
const userRegularLogin = {
  email: 'ahmad123@gmail.com',
  password: '123456'
}
const userAdminLogin = {
  email: 'noir123@gmail.com',
  password: '123456'
}
const userLogin = {
  email: 'asdasdfaf1443@gmail.com',
  password: '123456'
}

describe('*Auth', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('--Register', () => {
    describe('-create user with role admin', () => {
      it('should return status 201', async () => {
        const response = await supertest(app).post('/auth/register').send(userAdminCreated)
        expect(response.status).toBe(201)
      })
    })
    describe('-create user with role regular', () => {
      it('should return status 201', async () => {
        const response = await supertest(app).post('/auth/register').send(userRegularCreated)
        expect(response.status).toBe(201)
      })
    })
  })

  describe('--Login', () => {
    describe('-login user with role admin', () => {
      it('should return status 200', async () => {
        const response = await supertest(app).post('/auth/login').send(userAdminLogin)
        expect(response.status).toBe(200)
      })
    })
    describe('-login user with role regular', () => {
      it('should return status 200', async () => {
        const response = await supertest(app).post('/auth/login').send(userRegularLogin)
        expect(response.status).toBe(200)
      })
    })
    describe('-login user does not exist', () => {
      it('should return status 404', async () => {
        const response = await supertest(app).post('/auth/login').send(userLogin)
        expect(response.status).toBe(404)
      })
    })
  })
})
