require('module-alias/register')
import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import router from './routes'
import morganBody from 'morgan-body'
import { isCelebrateError } from 'celebrate'
import bodyParser from 'body-parser'
import { jsonErrorResponse } from './errors'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8000

app.use(bodyParser.json())
morganBody(app, { noColors: process.env.NODE_ENV === 'production' })

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/ping') {
    res.status(200).json({ message: 'pong' })
  } else next()
})

app.use('/', router)

// Attach error handler for celebrate validation
app.use((err: Error, _req: Request, res: Response) => {
  if (isCelebrateError(err)) {
    const allMessages: string[] = []
    err.details.forEach((value) => {
      allMessages.push(value.message)
    })
    res.status(422).json({ message: allMessages.join('\n') })
  } else {
    jsonErrorResponse(err, res)
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
