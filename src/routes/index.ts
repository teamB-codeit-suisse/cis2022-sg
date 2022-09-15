import { Router } from 'express'
import echoRouter from './echo'
import sumRouter from './sum'

const router = Router()
router.use('/', echoRouter)
router.use('/', sumRouter)

export default router
