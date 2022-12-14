require('module-alias/register')
import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import router from './routes'
import morganBody from 'morgan-body'
import { isCelebrateError } from 'celebrate'
import bodyParser from 'body-parser'
import { jsonErrorResponse } from './utils/errors'
import JSON5 from 'json5'
const path = require('path')

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8000

if (app.get('env') !== 'test') {
  morganBody(app, { noColors: process.env.NODE_ENV === 'production' })
}

app.use(bodyParser.text({ type: '*/*' }))
app.use((req: Request, _res: Response, next: NextFunction) => {
  req.body = JSON5.parse(req.body)
  next()
})
// app.use(bodyParser.json())

// app.use(bodyParser.json({ limit: 1000000000 * 1024 }))
// app.use(bodyParser.text({ limit: 1000000000 * 1024 }))
// app.use(bodyParser.json())

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/ping' || req.url === '/') {
    res.status(200).json({ message: 'pong' })
  } else next()
})

app.use('/', router)
app.use('/', express.static(path.join(__dirname, 'public')))

// Attach error handler for celebrate validation
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (isCelebrateError(err)) {
    const allMessages: string[] = []
    err.details.forEach((value) => {
      allMessages.push(value.message)
    })
    res.status(422).json({ message: allMessages.join('\n') })
  } else {
    console.log(err)
    jsonErrorResponse(err, res)
  }
})

const server = app.listen(port, () => {
  if (app.get('env') !== 'test') {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
  }
})

export default server
