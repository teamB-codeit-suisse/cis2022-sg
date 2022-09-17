import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'
import { getStonks } from '../solvers/stonks'

const router = Router()

const stonksCelebrate = {
  [Segments.BODY]: Joi.array().items(Joi.object({
    energy: Joi.number(),
    capital: Joi.number(),
    timeline: Joi.object()
  }))
}

const stonks = async (req: Request, res: Response) => {
  const input = req.body
  const output = getStonks(input)
  return res.status(200).json(output)
}

router.post('/stonks', celebrate(stonksCelebrate), asyncErrorWrapper(stonks))

export default router
