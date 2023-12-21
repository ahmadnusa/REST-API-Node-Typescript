import express, { Application } from 'express'
import { routes } from '../routes'
import bodyParser from 'body-parser'
import cors from 'cors'
import deserializedToken from '../middleware/deserializedToken'

const createServer = () => {
  const app: Application = express()
  app.use(deserializedToken)
  // parse body request
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // cors acces handler
  app.use(cors())
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Method', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
  })

  routes(app)
  return app
}

export default createServer
