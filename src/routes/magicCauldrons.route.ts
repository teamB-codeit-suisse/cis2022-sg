import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'
import {
  magicCauldronPart1,
  magicCauldronPart2,
  magicCauldronPart3,
  magicCauldronPart4,
  Part1Input,
  Part2Input,
  Part3Input,
  Part4Input,
} from '../solvers/magicCauldron'

const router = Router()

const magicCauldronCelebrate = {
  [Segments.BODY]: Joi.array().items(
    Joi.object({
      part1: Joi.object({
        flow_rate: Joi.number(),
        time: Joi.number(),
        row_number: Joi.number(),
        col_number: Joi.number(),
      }),
      part2: Joi.object({
        flow_rate: Joi.number(),
        amount_of_soup: Joi.number(),
        row_number: Joi.number(),
        col_number: Joi.number(),
      }),
      part3: Joi.object({
        flow_rate: Joi.number(),
        time: Joi.number(),
        row_number: Joi.number(),
        col_number: Joi.number(),
      }),
      part4: Joi.object({
        flow_rate: Joi.number(),
        amount_of_soup: Joi.number(),
        row_number: Joi.number(),
        col_number: Joi.number(),
      }),
    })
  ),
}

type MagicCauldronBody = {
  part1: Part1Input
  part2: Part2Input
  part3: Part3Input
  part4: Part4Input
}

const magicCauldron = async (req: Request, res: Response) => {
  const ans = []
  for (const input of req.body) {
    const { part1, part2, part3, part4 }: MagicCauldronBody = input
    const part1Solution = magicCauldronPart1(part1)
    const part2Solution = magicCauldronPart2(part2)
    const part3Solution = magicCauldronPart3(part3)
    const part4Solution = magicCauldronPart4(part4)
    ans.push({
      part1: part1Solution,
      part2: part2Solution,
      part3: part3Solution,
      part4: part4Solution,
    })
    console.log(ans)
  }
  res.status(200).send(ans)
}

router.post('/magiccauldrons', celebrate(magicCauldronCelebrate), asyncErrorWrapper(magicCauldron))

export default router
