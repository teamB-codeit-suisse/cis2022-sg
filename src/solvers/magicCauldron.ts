type Position = {
  row_number: number
  col_number: number
}

export type Part1Input = Position & { flow_rate: number; time: number }
export type Part2Input = Position & { flow_rate: number; amount_of_soup: number }
export type Part3Input = Position & { flow_rate: number; time: number }
export type Part4Input = Position & { flow_rate: number; amount_of_soup: number }

export function magicCauldronPart1(input: Part1Input) {
  const { flow_rate, time, row_number, col_number } = input
  let amounts = [flow_rate * time]
  for (let i = 0; i < row_number; i++) {
    const nextAmounts = Array(i + 2).fill(0)
    for (let j = 0; j <= i; j++) amounts[j] = Math.max(0, amounts[j] - 100)
    for (let j = 0; j <= i; j++) {
      nextAmounts[j] += amounts[j] / 2
      nextAmounts[j + 1] += amounts[j] / 2
    }
    amounts = nextAmounts
  }
  return Math.min(100, amounts[col_number])
}

export function magicCauldronPart2(input: Part2Input) {
  const { flow_rate, amount_of_soup, row_number, col_number } = input
  let lo = 0,
    hi = 999
  while (hi - lo > 0.2) {
    const mid = (lo + hi) / 2
    let amounts = [flow_rate * mid]
    for (let i = 0; i < row_number; i++) {
      const nextAmounts = Array(i + 2).fill(0)
      for (let j = 0; j <= i; j++) amounts[j] = Math.max(0, amounts[j] - 100)
      for (let j = 0; j <= i; j++) {
        nextAmounts[j] += amounts[j] / 2
        nextAmounts[j + 1] += amounts[j] / 2
      }
      amounts = nextAmounts
    }
    const value = amounts[col_number]
    if (value < amount_of_soup) lo = mid
    else hi = mid
  }
  return Math.round((lo + hi) / 2)
}

export function magicCauldronPart3(input: Part3Input) {
  const { flow_rate, time, row_number, col_number } = input
  let amounts = [flow_rate * time]
  for (let i = 0; i < row_number; i++) {
    const nextAmounts = Array(i + 2).fill(0)
    for (let j = 0; j <= i; j++) amounts[j] = Math.max(0, amounts[j] - (j % 2) === 0 ? 150 : 100)
    for (let j = 0; j <= i; j++) {
      nextAmounts[j] += amounts[j] / 2
      nextAmounts[j + 1] += amounts[j] / 2
    }
    amounts = nextAmounts
  }
  return Math.min(col_number % 2 === 0 ? 150 : 100, amounts[col_number])
}

export function magicCauldronPart4(input: Part4Input) {
  const { flow_rate, amount_of_soup, row_number, col_number } = input
  let lo = 0,
    hi = 999
  while (hi - lo > 0.2) {
    const mid = (lo + hi) / 2
    let amounts = [flow_rate * mid]
    for (let i = 0; i < row_number; i++) {
      const nextAmounts = Array(i + 2).fill(0)
      for (let j = 0; j <= i; j++) amounts[j] = Math.max(0, amounts[j] - (j % 2) === 0 ? 150 : 100)
      for (let j = 0; j <= i; j++) {
        nextAmounts[j] += amounts[j] / 2
        nextAmounts[j + 1] += amounts[j] / 2
      }
      amounts = nextAmounts
    }
    const value = amounts[col_number]
    if (value < amount_of_soup) lo = mid
    else hi = mid
  }
  return Math.round((lo + hi) / 2)
}
