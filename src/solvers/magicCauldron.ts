type Position = {
  row_number: number
  col_number: number
}

export type Part1Input = Position & { flow_rate: number; time: number }
export type Part2Input = Position & { flow_rate: number; amount_of_soup: number }
export type Part3Input = Position & { flow_rate: number; time: number }
export type Part4Input = Position & { flow_rate: number; amount_of_soup: number }

function simulate(
  amount: number,
  row: number,
  col: number,
  cap: (r: number, c: number) => number
): number {
  let amounts = [amount]
  for (let i = 0; i < row; i++) {
    for (let j = 0; j <= i; j++) amounts[i] -= cap(i, j)
    const nextAmounts = Array(i + 2).fill(0)
    for (let j = 0; j <= i; j++) {
      if (amounts[j] <= 0) continue
      nextAmounts[j] += amounts[j] / 2
      nextAmounts[j + 1] += amounts[j] / 2
    }
    amounts = nextAmounts
  }
  return Math.min(cap(row, col), amounts[col])
}

const capacity1 = () => 100
const capacity2 = (_: number, c: number) => (c % 2 === 0 ? 150 : 100)

export function magicCauldronPart1(input: Part1Input) {
  const { flow_rate, time, row_number, col_number } = input
  const ans = simulate(flow_rate * time, row_number, col_number, capacity1)
  return Math.round(ans * 100) / 100
}

export function magicCauldronPart2(input: Part2Input) {
  const { flow_rate, amount_of_soup, row_number, col_number } = input
  let lo = 0,
    hi = 999,
    ans = -1
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    const value = simulate(flow_rate * mid, row_number, col_number, capacity1)
    if (value <= amount_of_soup) {
      lo = mid + 1
      ans = mid
    } else hi = mid - 1
  }
  if (simulate(flow_rate * (ans + 0.5), row_number, col_number, capacity1) <= amount_of_soup) ans++
  return ans
}

export function magicCauldronPart3(input: Part3Input) {
  const { flow_rate, time, row_number, col_number } = input
  const ans = simulate(flow_rate * time, row_number, col_number, capacity2)
  return Math.round(ans * 100) / 100
}

export function magicCauldronPart4(input: Part4Input) {
  const { flow_rate, amount_of_soup, row_number, col_number } = input
  let lo = 0,
    hi = 999,
    ans = -1
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    const value = simulate(flow_rate * mid, row_number, col_number, capacity2)
    if (value <= amount_of_soup) {
      lo = mid + 1
      ans = mid
    } else hi = mid - 1
  }
  if (simulate(flow_rate * (ans + 0.5), row_number, col_number, capacity2) <= amount_of_soup) ans++
  return ans
}
