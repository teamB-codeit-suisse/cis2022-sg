type stocks = {
  price: number
  qty: number
}

function solve(
  capital: number,
  stocks: Array<stocks & { name: string; profit: number }>
): [number, string[]] {
  const dp = Array(capital + 1).fill(0)
  const path = Array(capital + 1)
    .fill(0)
    .map((_) => ({ from: 0, name: '' }))

  for (let i = 0; i < stocks.length; i++) {
    const stock = stocks[i]
    for (let j = 0; j < Math.min(stock.qty, capital); j++) {
      for (let k = capital; k >= stock.price; k--) {
        if (dp[k - stock.price] + stock.profit > dp[k]) {
          dp[k] = dp[k - stock.price] + stock.profit
          path[k] = { from: k - stock.price, name: stock.name }
        }
      }
    }
  }

  let maxCapital = 0
  let maxIndex = 0
  for (let i = 0; i <= capital; i++) {
    if (dp[i] + i > maxCapital) {
      maxCapital = dp[i] + i
      maxIndex = i
    }
  }

  const bought: Record<string, number> = {}
  while (maxIndex !== 0) {
    if (path[maxIndex].name === '') break
    if (!bought.hasOwnProperty(path[maxIndex].name)) bought[path[maxIndex].name] = 0
    bought[path[maxIndex].name]++
    maxIndex = path[maxIndex].from
  }
  return [maxCapital, Object.entries(bought).map(([name, qty]) => `${name}-${qty}`)]
}

export function stonksSolution(
  energy: number,
  capital: number,
  timeline: Record<string, Record<string, stocks>>
): string[] {
  if (energy > 3) return []

  const output = []
  const stock37 = timeline['2037']
  const stock36 = timeline['2036']
  let goodStocks: Array<stocks & { name: string; profit: number }> = []
  for (const stock in stock37) {
    if (!stock36.hasOwnProperty(stock)) continue
    const profit = stock36[stock].price - stock37[stock].price
    if (profit <= 0) continue
    goodStocks.push({
      name: stock,
      price: stock37[stock].price,
      qty: stock37[stock].qty,
      profit,
    })
  }
  const [newCapital, output1] = solve(capital, goodStocks)
  output.push(...output1.map((s) => 'b-' + s))
  output.push('j-2037-2036')
  output.push(...output1.map((s) => 's-' + s))
  goodStocks = []
  for (const stock in stock36) {
    if (!stock37.hasOwnProperty(stock)) continue
    const profit = stock37[stock].price - stock36[stock].price
    if (profit <= 0) continue
    goodStocks.push({
      name: stock,
      price: stock36[stock].price,
      qty: stock36[stock].qty,
      profit,
    })
  }
  const [_, output2] = solve(newCapital, goodStocks)
  output.push(...output2.map((s) => 'b-' + s))
  output.push('j-2036-2037')
  output.push(...output2.map((s) => 's-' + s))
  return output
}
