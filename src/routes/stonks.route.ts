/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'

const router = Router()

const echoCelebrate = {
  [Segments.BODY]: Joi.array().items(
    Joi.object({
      energy: Joi.number().required(),
      capital: Joi.number().required(),
      timeline: Joi.object().required(),
    })
  ),
}

type stocks = {
  price: number
  qty: number
}

type stonksBody = {
  energy: number
  capital: number
  timeline: Record<string, Record<string, stocks>>
}

const stonksHandler = async (req: Request, res: Response) => {
  //@ts-ignore
  const { energy, capital, timeline }: stonksBody = req.body
  return res.status(200).json({ message: 'helloworld' })
}

router.post('/stonks', celebrate(echoCelebrate), asyncErrorWrapper(stonksHandler))

export default router
