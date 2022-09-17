import { Request, Response, Router } from 'express'
import { connect4Solution } from 'solvers/connect4'
import { asyncErrorWrapper } from '../utils/errors'

const router = Router()

type Connect4Body = {
  battleId: string
}

const connect4 = async (req: Request, res: Response) => {
  const { battleId }: Connect4Body = req.body
  connect4Solution(battleId)
  res.status(200).send()
}

router.post('/connect4', asyncErrorWrapper(connect4))

export default router
