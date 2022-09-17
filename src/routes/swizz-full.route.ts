import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'

const router = Router()

const echoCelebrate = {
  [Segments.BODY]: Joi.object({
    questions: Joi.array()
      .items(
        Joi.object({
          lower: Joi.number().required(),
          higher: Joi.number().required(),
        })
      )
      .required(),
    maxRating: Joi.number().required(),
    lucky: Joi.number().required(),
  }),
}

type questions = {
  lower: number
  higher: number
}

type body = {
  questions: questions[]
  maxRating: number
  lucky: number
}

function gcd(x: number, y: number): number {
  x = Math.abs(x)
  y = Math.abs(y)
  while (y) {
    const t = y
    y = x % y
    x = t
  }
  return x
}

const sum = async (req: Request, res: Response) => {
  const { questions, maxRating, lucky }: body = req.body
  let p = 0
  let q = 1
  let cnt = 0
  for (const question of questions) {
    let { lower, higher } = question
    lower += p * lucky
    lower %= maxRating - 1
    lower += 1
    higher += p * lucky
    higher %= maxRating - 1
    higher += 1
    let cur = 0
    if (higher >= lower) cur = higher - lower + 1
    p *= cnt
    cnt += 1
    p += cur
    q *= cnt
    const d = gcd(p, q)
    p /= d
    q /= d
  }
  return res.status(200).json({ p, q })
}

router.post('/stig/full', celebrate(echoCelebrate), asyncErrorWrapper(sum))

export default router
