import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'
import { travellingSuisseRobotSolution } from '../solvers/travellingSuisseRobot'

const router = Router()

const travellingSuisseRobotCelebrate = {
  [Segments.BODY]: Joi.string(),
}

const travellingSuisseRobot = async (req: Request, res: Response) => {
  const mapString = req.body
  const solution = travellingSuisseRobotSolution(mapString)
  return res.status(200).contentType('text/plain').send(solution)
}

router.post(
  '/travelling-suisse-robot',
  celebrate(travellingSuisseRobotCelebrate),
  asyncErrorWrapper(travellingSuisseRobot)
)

export default router
