import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../errors'
import { tickerStreamPart1Solution, tickerStreamPart2Solution } from '../solvers/tickerStream'

const router = Router()

const tickerStreamPart1Celebrate = {
  [Segments.BODY]: Joi.object({
    stream: Joi.array().required(),
  }),
}

const tickerStreamPart2Celebrate = {
  [Segments.BODY]: Joi.object({
    stream: Joi.array().required(),
    quantityBlock: Joi.number().required(),
  }),
}

type tickerStreamPart1Body = {
  stream: Array<String>,
}

type tickerStreamPart2Body = {
  stream: Array<String>,
  quantityBlock: Number,
}

const tickerStreamPart1 = async (req: Request, res: Response) => {
  const { stream }: tickerStreamPart1Body = req.body
  const output = tickerStreamPart1Solution(stream)
  return res.status(200).json({ "output": output })
}

const tickerStreamPart2 = async (req: Request, res: Response) => {
  const { stream, quantityBlock }: tickerStreamPart2Body = req.body
  const output = tickerStreamPart2Solution(stream, quantityBlock)
  return res.status(200).json({ "output": output })
}

router.post('/tickerStreamPart1', 
  celebrate(tickerStreamPart1Celebrate), 
  asyncErrorWrapper(tickerStreamPart1))

  router.post('/tickerStreamPart2', 
    celebrate(tickerStreamPart2Celebrate), 
    asyncErrorWrapper(tickerStreamPart2))

export default router
