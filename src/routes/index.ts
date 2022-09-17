import { Router } from 'express'
import echoRouter from './echo.route'
import sumRouter from './sum.route'
import tickerStreamRouter from './tickerStream.route'
import calendarDaysRouter from './calendarDays.route'

const router = Router()
router.use('/', echoRouter)
router.use('/', sumRouter)
router.use(tickerStreamRouter)
router.use(calendarDaysRouter)

export default router
