import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'
import { cryptocollapzSolution } from '../solvers/cryptocollapz'

const router = Router()

const cryptocollapzCelebrate = {
  [Segments.BODY]: Joi.array().items(
    Joi.array().items(
      Joi.number()
    ).required(),
  ).required(),
}

const cryptocollapz = async (req: Request, res: Response) => {
  const prices = req.body
  const output = cryptocollapzSolution(prices)
  return res.status(200).json(output)
}

router.post(
  '/cryptocollapz',
  celebrate(cryptocollapzCelebrate),
  asyncErrorWrapper(cryptocollapz)
)

export default router
