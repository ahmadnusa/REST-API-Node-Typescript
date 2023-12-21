import createServer from './utils/server'
import { logger } from './utils/logger'

// connect DB
import './utils/connectDB'

const app = createServer()

const port: number = 3000

app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}/`)
})
