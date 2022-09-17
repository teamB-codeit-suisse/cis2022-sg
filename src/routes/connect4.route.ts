import { Request, Response, Router } from 'express'
import { asyncErrorWrapper } from '../utils/errors'
import workerFarm from 'worker-farm'

const workers = workerFarm(require.resolve('../solvers/connect4'))

const router = Router()

type Connect4Body = {
  battleId: string
}

const connect4 = async (req: Request, res: Response) => {
  const { battleId }: Connect4Body = req.body
  res.status(200).send()
  workers(battleId, () => {})
}

router.post('/connect4', asyncErrorWrapper(connect4))

export default router
