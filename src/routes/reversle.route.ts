import { Request, Response, Router } from 'express'
import { reverslePart1Solution, reverslePart2Solution } from '../solvers/reversle'
import { asyncErrorWrapper } from '../utils/errors'

const router = Router()

type reversleBody = {
  equationLength: number
  attemptsAllowed: number
  attemptsLeft: number
  equationHistory: string[][]
  resultHistory: string[][]
}

const reversle = async (req: Request, res: Response) => {
  const {
    equationLength,
    attemptsAllowed,
    equationHistory,
    resultHistory,
    attemptsLeft,
  }: reversleBody = req.body
  let equation: string[]
  if (attemptsAllowed) {
    // initial query
    equation = reverslePart1Solution(equationLength, attemptsAllowed)
  } else {
    // subsequent queries
    equation = reverslePart2Solution(equationLength, equationHistory, resultHistory, attemptsLeft)
  }
  return res.status(200).json({ equation })
}

router.post('/reversle', asyncErrorWrapper(reversle))

export default router
