import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'
import { tickerStreamPart1Solution, tickerStreamPart2Solution } from '../solvers/tickerStream'

const router = Router()

// Regex pattern for hh:mm,string,number,number (1 d.p.)
const STREAM_REGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9],[^,]*,[0-9]*,[0-9]*(.[0-9])?$/

const tickerStreamPart1Celebrate = {
  [Segments.BODY]: Joi.object({
    stream: Joi.array()
      .items(
        Joi.string().regex(STREAM_REGEX).messages({
          'string.pattern.base':
            'stream does not match allowed format of hh:mm,ticker,quantity,price',
        })
      )
      .required(),
  }),
}

const tickerStreamPart2Celebrate = {
  [Segments.BODY]: Joi.object({
    stream: Joi.array()
      .items(
        Joi.string().regex(STREAM_REGEX).messages({
          'string.pattern.base':
            'stream does not match allowed format of hh:mm,ticker,quantity,price',
        })
      )
      .required(),
    quantityBlock: Joi.number().required(),
  }),
}

type tickerStreamPart1Body = {
  stream: string[]
}

type tickerStreamPart2Body = {
  stream: string[]
  quantityBlock: number
}

const tickerStreamPart1 = async (req: Request, res: Response) => {
  const { stream }: tickerStreamPart1Body = req.body
  const output = tickerStreamPart1Solution(stream)
  return res.status(200).json({ output })
}

const tickerStreamPart2 = async (req: Request, res: Response) => {
  const { stream, quantityBlock }: tickerStreamPart2Body = req.body
  const output = tickerStreamPart2Solution(stream, quantityBlock)
  return res.status(200).json({ output })
}

router.post(
  '/tickerStreamPart1',
  celebrate(tickerStreamPart1Celebrate),
  asyncErrorWrapper(tickerStreamPart1)
)

router.post(
  '/tickerStreamPart2',
  celebrate(tickerStreamPart2Celebrate),
  asyncErrorWrapper(tickerStreamPart2)
)

export default router
