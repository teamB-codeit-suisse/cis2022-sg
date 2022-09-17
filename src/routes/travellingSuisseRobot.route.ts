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
  // manually set Content-Type
  // as express will add charset automatically to Content-Type
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write(solution)
  res.end()
}

router.post(
  '/travelling-suisse-robot',
  celebrate(travellingSuisseRobotCelebrate),
  asyncErrorWrapper(travellingSuisseRobot)
)

export default router
