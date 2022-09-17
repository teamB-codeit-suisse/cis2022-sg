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
  from: number
  to: number
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
      let { from, to } = question
      from += p * offset
      from %= maxRating - 1
      from += 1
      to += p * offset
      to %= maxRating - 1
      to += 1
      //   console.log(from)
      //   console.log(to)
      if (to >= from) sum += to - from + 1
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
