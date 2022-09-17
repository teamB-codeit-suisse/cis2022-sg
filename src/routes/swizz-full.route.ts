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

class Node {
  l: Node
  r: Node
  val: number
  lazy: number
  func: (x: number, y: number) => number
  constructor(func: (x: number, y: number) => number) {
    this.lazy = -1
    this.func = func
  }
  propo() {
    if (this.lazy != -1) {
      if (!this.l) this.l = new Node(this.func)
      if (!this.r) this.r = new Node(this.func)
      this.l.val = this.l.lazy = this.lazy
      this.r.val = this.r.lazy = this.lazy
      this.lazy = -1
    }
  }

  update(s: number, e: number, x: number, y: number, v: number) {
    if (s == x && y == e) {
      this.val += v
      this.lazy += v
    } else {
      this.propo()
      const m = (s + e) / 2
      if (y <= m) {
        this.l.update(s, m, x, y, v)
      } else if (x > m) {
        this.r.update(m + 1, e, x, y, v)
      } else {
        this.l.update(s, m, x, m, v)
        this.r.update(m + 1, e, m + 1, y, v)
      }
      this.val = this.func(this.l.val, this.r.val)
    }
  }

  query(s: number, e: number, x: number, y: number) {
    if (s == x && y == e) return this.val
    this.propo()
    const m = (s + e) / 2
    if (y <= m) return this.l.query(s, m, x, y)
    if (x > m) return this.r.query(m + 1, e, x, y)
    return this.func(this.l.query(s, m, x, m), this.r.query(m + 1, e, m + 1, y))
  }
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

function bs(s: Set<number[]>, x: number[]) {
  let lo = 0
  let hi: number = s.size - 1
  let res: number = s.size
  while (lo <= hi) {
    const mid = (lo + hi) / 2
    if (s[mid][0] == x[0]) {
      if (s[mid][1] < x[1]) {
        res = mid
        lo = mid + 1
      } else hi = mid - 1
    } else {
      if (s[mid][0] < x[0]) {
        res = mid
        lo = mid + 1
      } else hi = mid - 1
    }
  }
  return res
}

const sum = async (req: Request, res: Response) => {
  const testcases: Testcase[] = req.body
  const result: { p: number; q: number }[] = []
  for (const testcase of testcases) {
    const { questions, lucky, maxRating } = testcase
    const mi = new Node(Math.min)
    const ma = new Node(Math.max)
    mi.update(1, maxRating, 1, maxRating, 1)
    ma.update(1, maxRating, 1, maxRating, maxRating)
    let p = 1
    let q = 1
    const startIdx = {}
    startIdx[maxRating] = 1
    const ranges = {}
    ranges[1] = new Set([1, maxRating])
    const offset = lucky || 0
    let cnt = 0
    for (const question of questions) {
      let { lower, upper } = question
      lower += p * offset - 1
      lower %= maxRating
      lower += 1
      upper += p * offset - 1
      upper %= maxRating
      upper += 1
      //   console.log(lower)
      //   console.log(upper)
      if (upper >= lower) {
        const lptr = mi.query(1, maxRating, lower, upper)
        while (lptr < lower) {
          const s = ranges[lptr]
          const l = bs(s, [lower, 1e9 + 1]) - 1
          const r = bs(s, [upper, 1e9 + 1]) - 1
          s.get(l)
        }
      }
      cnt += 1
      q = cnt
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
