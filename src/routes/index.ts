import { Router } from 'express'
import echoRouter from './echo'
import sumRouter from './sum'
import tickerStreamRouter from './tickerStream'

const router = Router()
router.use('/', echoRouter)
router.use('/', sumRouter)
router.use('/problems/', tickerStreamRouter)

export default router
