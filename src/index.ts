import express, { Application, NextFunction, Request, Response } from 'express'

const app: Application = express()
const port: number = 3000

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`)
})
