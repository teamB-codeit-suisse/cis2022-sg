export function cryptocollapzSolution(prices: number[][]): number[][] {
  const output: number[][] = []
  for (let i = 0; i < prices.length; i++) {
    const row: number[] = []
    for (let j = 0; j < prices[i].length; j++) {
      let current = prices[i][j]
      let high = 4
      while (current != 1) {
        high = Math.max(high, current)
        if (current % 2) {
          current = current * 3 + 1
        } else {
          current /= 2
        }
      }
      row.push(high)
    }
    output.push(row)
  }
  return output
}
