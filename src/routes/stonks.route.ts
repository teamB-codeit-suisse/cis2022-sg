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
  const tests: stonksBody[] = req.body
  let a = 0
  const result: string[][] = []
  for (let i = 0; i < tests.length; i++) {
    a = Math.max(a, Object.keys(tests[i]).length)
    result.push([a.toString()])
  }
  return res.status(200).json(result)
}

router.post('/stonks', celebrate(echoCelebrate), asyncErrorWrapper(stonksHandler))

export default router
