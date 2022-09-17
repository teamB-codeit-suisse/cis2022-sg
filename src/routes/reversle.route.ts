import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'

const router = Router()

const reversleCelebrate = {
  [Segments.BODY]: Joi.object({
    equationLength: Joi.number().required(),
    attemptsAllowed: Joi.number(),
    attemptsLeft: Joi.number(),
    equationHistory: Joi.array().items(Joi.string()),
    resultHistory: Joi.array().items(Joi.string()),
  }),
}

type reversleBody = {
  equationLength: number,
  attemptsAllowed?: number,
  attemptsLeft?: number,
  equationHistory?: string[],
  resultHistory?: string[]
}

const reversle = async (req: Request, res: Response) => {
  const { equationLength }: reversleBody = req.body
  const equation = []
  for (let i = 0; i < equationLength; i++)equation.push('=')
  return res.status(200).json({ equation })
}

router.post(
  '/reversle',
  celebrate(reversleCelebrate),
  asyncErrorWrapper(reversle)
)

export default router
