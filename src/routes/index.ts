import { Router } from 'express'
import echoRouter from './echo'

const router = Router()
router.use('/', echoRouter)

export default router
