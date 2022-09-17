import { Request, Response, Router } from 'express'
import { asyncErrorWrapper } from '../utils/errors'
import { quordleKeyboardSolution } from '../solvers/quordleKeyboard'

const router = Router()

type quordleKeyboardBody = {
  answers: string[]
  attempts: string[]
  numbers: number[]
}

const quordleKeyboard = async (req: Request, res: Response) => {
  const { answers, attempts, numbers }: quordleKeyboardBody = req.body
  const output = quordleKeyboardSolution(answers, attempts, numbers)
  return res.status(200).json(output)
}

router.post('/quordleKeyboard', asyncErrorWrapper(quordleKeyboard))

export default router
