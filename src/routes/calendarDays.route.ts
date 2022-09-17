import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'
import { calendarDaysSolution } from '../solvers/calendarDays'

const router = Router()

// Regex pattern for hh:mm,string,number,number (1 d.p.)
const calendarDaysCelebrate = {
  [Segments.BODY]: Joi.object({
    numbers: Joi.array().items(Joi.number().integer()).required(),
  }),
}

type calendarDaysBody = {
  numbers: number[]
}

const calendarDays = async (req: Request, res: Response) => {
  const { numbers }: calendarDaysBody = req.body
  const { part1, part2 } = calendarDaysSolution(numbers)
  return res.status(200).json({ part1, part2 })
}

router.post('/calendarDays', celebrate(calendarDaysCelebrate), asyncErrorWrapper(calendarDays))

export default router
