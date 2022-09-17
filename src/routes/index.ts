import { Router } from 'express'
import echoRouter from './echo.route'
import sumRouter from './sum.route'
import tickerStreamRouter from './tickerStream.route'
import cryptocollapzRouter from './cryptocollapz.route'
import rubiksRouter from './rubiks.route'

const router = Router()
router.use('/', echoRouter)
router.use('/', sumRouter)
router.use(tickerStreamRouter)
router.use(cryptocollapzRouter)
router.use(rubiksRouter)

export default router
