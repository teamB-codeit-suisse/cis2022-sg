import { Router } from 'express'
import echoRouter from './echo.route'
import sumRouter from './sum.route'
import tickerStreamRouter from './tickerStream.route'
import cryptocollapzRouter from './cryptocollapz.route'
import calendarDaysRouter from './calendarDays.route'
<<<<<<< HEAD
import rubiksRouter from './rubiks.route'
=======
import travellingSuisseRobot from './travellingSuisseRobot.route'
>>>>>>> a41c72b (feat: travelling suisse robot)

const router = Router()
router.use('/', echoRouter)
router.use('/', sumRouter)
router.use(tickerStreamRouter)
router.use(cryptocollapzRouter)
router.use(calendarDaysRouter)
<<<<<<< HEAD
router.use(rubiksRouter)
=======
router.use(travellingSuisseRobot)
>>>>>>> a41c72b (feat: travelling suisse robot)

export default router
