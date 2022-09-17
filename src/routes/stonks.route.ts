/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'
import { stonksSolution } from '../solvers/stonks'

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
  const result: string[][] = []
  for (let i = 0; i < tests.length; i++) {
    const { capital, energy, timeline } = tests[i]
    console.log(`Testcase ${i} - ${capital} | ${energy}`)
    result.push(stonksSolution(energy, capital, timeline))
  }
  return res.status(200).json(result)
}

router.post('/stonks', celebrate(echoCelebrate), asyncErrorWrapper(stonksHandler))

export default router
