import { Request, Response, Router } from 'express'
import { asyncErrorWrapper } from '../utils/errors'
import { socialDistancingSolution } from '../solvers/socialDistancing'

const router = Router()

type socialDistancingBody = string[]

const socialDistancing = async (req: Request, res: Response) => {
  const inputs: socialDistancingBody = req.body
  const outputs = inputs.map((input) => socialDistancingSolution(input))
  return res.status(200).json(outputs)
}

router.post('/social-distancing', asyncErrorWrapper(socialDistancing))

export default router
