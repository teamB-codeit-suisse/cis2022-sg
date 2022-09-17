import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'
import { setLookUp, query } from '../solvers/dnsCache'

const router = Router()

const instantiateDNSLookupCelebrate = {
  [Segments.BODY]: Joi.object({
    testId: Joi.number(),
    lookupTable:  Joi.object()
  })
}

const simulateQueryCelebrate = {
  [Segments.BODY]: Joi.object({
    cacheSize: Joi.number(),
    log: Joi.array().items(
      Joi.string()
    )
  })
}

const instantiateDNSLookup = async (req: Request, res: Response) => {
  const { lookupTable } = req.body
  setLookUp(lookupTable)
  return res.status(200).json({ "success": true })
}

const simulateQuery = async (req: Request, res: Response) => {
  const { cacheSize, log } = req.body
  const output = query(cacheSize, log);
  console.log(output)
  return res.status(200).json({ status:200, "JSON": output })

}

router.post('/instantiateDNSLookup', celebrate(instantiateDNSLookupCelebrate), asyncErrorWrapper(instantiateDNSLookup))

router.post('/simulateQuery', celebrate(simulateQueryCelebrate), asyncErrorWrapper(simulateQuery))

export default router
