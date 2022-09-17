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
const reversle = async (_req: Request, res: Response) => {

  return res.status(200).json({ message: "hi" })
}

router.post(
  '/reversle',
  celebrate(reversleCelebrate),
  asyncErrorWrapper(reversle)
)

export default router
