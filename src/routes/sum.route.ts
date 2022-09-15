import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'

const router = Router()

const echoCelebrate = {
  [Segments.BODY]: Joi.object({
    a: Joi.number().required(),
    b: Joi.number().required(),
  }),
}

type sumBody = {
  a: number
  b: number
}

const sum = async (req: Request, res: Response) => {
  const { a, b }: sumBody = req.body
  const sum = a + b
  return res.status(200).json({ sum })
}

router.post('/sum', celebrate(echoCelebrate), asyncErrorWrapper(sum))

export default router
