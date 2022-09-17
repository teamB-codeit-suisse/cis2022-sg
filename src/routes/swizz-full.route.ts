import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'

const router = Router()

const echoCelebrate = {
  [Segments.BODY]: Joi.array().items(
    Joi.object({
      questions: Joi.array().items(Joi.object()).required(),
      maxRating: Joi.number().required(),
      lucky: Joi.number(),
    })
  ),
}

type questions = {
  lower: number
  upper: number
}

type Testcase = {
  questions: questions[]
  maxRating: number
  lucky?: number
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
  const testcases: Testcase[] = req.body
  const result: { p: number; q: number }[] = []
  for (const testcase of testcases) {
    const { questions, lucky, maxRating } = testcase
    let p = 0
    let q = 0
    let cnt = 0
    let sum = 0
    const offset = lucky || 0
    for (const question of questions) {
      let { lower, upper } = question
      lower += p * offset
      lower %= maxRating - 1
      lower += 1
      upper += p * offset
      upper %= maxRating - 1
      upper += 1
      //   console.log(lower)
      //   console.log(upper)
      if (upper >= lower) sum += upper - lower + 1
      p = sum
      cnt += 1
      q = cnt * maxRating
      const d = gcd(p, q)
      p /= d
      q /= d
      //   console.log(p)
      //   console.log(q)
    }
    if (p == 0) q = 1
    result.push({ p, q })
  }
  return res.status(200).json(result)
}

router.post('/stig/full', celebrate(echoCelebrate), asyncErrorWrapper(sum))

export default router
