type Position = {
  row_number: number
  col_number: number
}

export type Part1Input = Position & { flow_rate: number; time: number }
export type Part2Input = Position & { flow_rate: number; amount_of_soup: number }
export type Part3Input = Position & { flow_rate: number; time: number }
export type Part4Input = Position & { flow_rate: number; amount_of_soup: number }

class Cauldron {
  public static map: Record<string, Cauldron> = {}
  public static capacityF: (r: number, c: number) => number

  public static clear() {
    this.map = {}
  }

  public static insert(row: number, col: number, cauldron: Cauldron) {
    Cauldron.map[JSON.stringify({ row, col })] = cauldron
  }

  public static get(row: number, col: number): Cauldron {
    if (!Cauldron.map.hasOwnProperty(JSON.stringify({ row, col }))) {
      Cauldron.insert(row, col, new Cauldron(row, col, Cauldron.capacityF))
    }
    return Cauldron.map[JSON.stringify({ row, col })]
  }

  public value: number = 0
  constructor(
    public row: number,
    public col: number,
    public getCapacity: (r: number, c: number) => number
  ) {
    Cauldron.insert(this.row, this.col, this)
    Cauldron.capacityF = this.getCapacity
  }

  public get capacity() {
    return this.getCapacity(this.row, this.col)
  }
  public get leftChild() {
    return Cauldron.get(this.row + 1, this.col)
  }
  public get rightChild() {
    return Cauldron.get(this.row + 1, this.col + 1)
  }

  public add(amount: number) {
    this.value += amount
  }
  public overflow() {
    if (this.value < this.capacity) return 0
    return this.value - this.capacity
  }

  public static flow(amount: number) {
    let diff = [amount]
    for (let row = 0; true; row++) {
      for (let col = 0; col <= row; col++) {
        Cauldron.get(row, col).add(diff[col])
      }
      diff = Array(row + 2).fill(0)
      for (let col = 0; col <= row; col++) {
        diff[col] += Cauldron.get(row, col).overflow() / 2
        diff[col + 1] += Cauldron.get(row, col).overflow() / 2
      }
      if (diff.every((x) => x === 0)) break
    }
  }
}

export function magicCauldronPart1(input: Part1Input) {
  const { flow_rate, time, row_number, col_number } = input
  Cauldron.clear()
  new Cauldron(0, 0, () => 100)
  Cauldron.flow(flow_rate * time)
  const ans = Cauldron.get(row_number, col_number).value
  return ans
}

export function magicCauldronPart2(input: Part2Input) {
  const { flow_rate, amount_of_soup, row_number, col_number } = input
  let lo = 0,
    hi = 999
  while (hi - lo > 0.01) {
    const mid = (lo + hi) / 2
    Cauldron.clear()
    new Cauldron(0, 0, () => 100)
    Cauldron.flow(flow_rate * mid)
    const value = Cauldron.get(row_number, col_number).value
    if (value < amount_of_soup) lo = mid
    else hi = mid
  }
  return Math.round((lo + hi) / 2)
}

export function magicCauldronPart3(input: Part3Input) {
  const { flow_rate, time, row_number, col_number } = input
  Cauldron.clear()
  new Cauldron(0, 0, (_r, c) => (c % 2 === 0 ? 150 : 100))
  Cauldron.flow(flow_rate * time)
  const ans = Cauldron.get(row_number, col_number).value
  return ans
}

export function magicCauldronPart4(input: Part4Input) {
  const { flow_rate, amount_of_soup, row_number, col_number } = input
  let lo = 0,
    hi = 999
  while (hi - lo > 0.01) {
    const mid = (lo + hi) / 2
    Cauldron.clear()
    new Cauldron(0, 0, () => 100)
    Cauldron.flow(flow_rate * mid)
    const value = Cauldron.get(row_number, col_number).value
    if (value < amount_of_soup) lo = mid
    else hi = mid
  }
  return Math.round((lo + hi) / 2)
}
