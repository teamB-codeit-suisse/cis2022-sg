import { Router } from 'express'
import echoRouter from './echo.route'
import sumRouter from './sum.route'
import tickerStreamRouter from './tickerStream.route'
import cryptocollapzRouter from './cryptocollapz.route'
import calendarDaysRouter from './calendarDays.route'
import rubiksRouter from './rubiks.route'
import reversleRouter from './reversle.route'
import swissStigRouter from './swissStig.route'
import travellingSuisseRobot from './travellingSuisseRobot.route'
import magicCauldron from './magicCauldrons.route'
import quordleKeyboard from './quordleKeyboard.route'
import dnsCache from './dnsCache.route'
import socialDistancing from './socialDistancing.route'
import stonksRouter from './stonks.route'
import connect4 from './connect4.route'

const router = Router()
router.use('/', echoRouter)
router.use('/', sumRouter)
router.use(tickerStreamRouter)
router.use(cryptocollapzRouter)
router.use(calendarDaysRouter)
router.use(rubiksRouter)
router.use(swissStigRouter)
router.use(travellingSuisseRobot)
router.use(reversleRouter)
router.use(magicCauldron)
router.use(quordleKeyboard)
router.use(dnsCache)
router.use(socialDistancing)
router.use(stonksRouter)
router.use(connect4)

export default router
