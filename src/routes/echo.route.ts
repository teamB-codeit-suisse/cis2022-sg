import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'

const router = Router()

const echoCelebrate = {
  [Segments.BODY]: Joi.object({
    text: Joi.string().min(1).required(),
  }),
}

const helloWorld = async (req: Request, res: Response) => {
  const { text } = req.body
  return res.status(200).json({ text })
}

router.post('/echo', celebrate(echoCelebrate), asyncErrorWrapper(helloWorld))

export default router
