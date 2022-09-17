export type Stock = {
  price: number,
  qty: number
}

export interface Stocks {
  [key:string]: Stock
}

export interface Timeline {
  [key: string]: Stocks
}

export type Testcase = {
  energy: number,
  capital: number,
  timeline: Timeline
}

export function getStonks(input: Array<Testcase>) {
  for (let i = 0; i < input.length; i++) {
    const { energy, capital, timeline } = input[i];
    let s = new Set<string>()
    let t = new Set<string>()
    for (const time in input[i].timeline) {
      t.add(time)
      let stocks:Stocks = timeline[time as keyof Timeline]
      for (const name in stocks) {
        s.add(name)
      }
    }


    console.log(s.size, t.size, energy, capital)
  }
  return []
}