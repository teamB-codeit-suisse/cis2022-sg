import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'
import { swissStigPart1Solution, swissStigPart2Solution } from '../solvers/swissStig'

const router = Router()

const swissStigPart1Celebrate = {
  [Segments.BODY]: Joi.array().items(
    Joi.object({
      "questions" : Joi.array().items(
        Joi.object({
          "lower" : Joi.number(),
          "higher" : Joi.number()
        })),
      "maxRating" : Joi.number(),
    })
  )
}

const swissStigPart2Celebrate = {
  [Segments.BODY]: Joi.array().items(
    Joi.object({
      "questions" : Joi.array().items(
        Joi.object({
          "lower" : Joi.number(),
          "higher" : Joi.number()
        })),
      "maxRating" : Joi.number(),
      "lucky" : Joi.number(),
    })
  )
}

type Question = {
  lower: number,
  higher: number
}

type InterviewPart1 = {
  questions: Question[],
  maxRating: number
}

type InterviewPart2 = {
  questions: Question[],
  maxRating: number,
  lucky: number
}

const swissStigPart1 = async (req: Request, res: Response) => {
  const input : InterviewPart1[] = req.body
  const output = swissStigPart1Solution(input)
  return res.status(200).json(output)
}

const swissStigPart2 = async (req: Request, res: Response) => {
  const input : InterviewPart2[] = req.body
  const output = swissStigPart2Solution(input)
  return res.status(200).json(output)
}

router.post('/stig/warmup', celebrate(swissStigPart1Celebrate), asyncErrorWrapper(swissStigPart1))

router.post('/stig/full', celebrate(swissStigPart2Celebrate), asyncErrorWrapper(swissStigPart2))

export default router
