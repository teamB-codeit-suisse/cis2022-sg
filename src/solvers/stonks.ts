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

function bruteforce(
  capital:number, 
  energy:number, 
  year:number, 
  positions:Map<string, number>, 
  bought:Map<number, Map<string, number>>,
  path:string[],
  timeline:Timeline) {
    let year_string:string = (year + 2037).toString()
    if (energy === 0) {
      if (year === 0) {
        let stocks:Stocks = timeline[year_string as keyof Timeline]
        for (const name in stocks) {
          if (positions.get(name)) {
            if (positions.get(name)! > 0) {
              capital += stocks[name].price * positions.get(name)!;
            }
          }
        }
        return {capital: capital, path: path}
      } else {
        return {capital: 0, path: [""]}
      }
    }

    let best = {capital: 0, path: [""]}

    let stocks:Stocks = timeline[year_string as keyof Timeline]
    for (const name in stocks) {
      let cur:number = bought.get(year)!.get(name)!
      if (cur < stocks[name].qty) {
        if (capital >= stocks[name].price) {
          let bought1 = new Map<number, Map<string, number>>();
          for (const [key, value] of bought.entries()) {
            bought1.set(key, value);
          }
          let positions1 = new Map<string, number>(positions);
          let path1 = [...path]
          bought1.get(year)!.set(name, cur+1)
          positions1.set(name, positions.get(name)!+1)
          path1.push("b-" + name + "-1");
          let res = bruteforce(capital-stocks[name].price, energy, year, positions1, bought1, path1, timeline)
          if (res!.capital > best.capital) {
            best.capital = res!.capital;
            best.path = res!.path;
          }
        }
      }
      if (positions.get(name)! > 0) {
        let bought1 = new Map<number, Map<string, number>>();
        for (const [key, value] of bought.entries()) {
          bought1.set(key, value);
        }
        let positions1 = new Map<string, number>(positions);
        let path1 = [...path]
        positions1.set(name, positions.get(name)!-1)
        path1.push("s-" + name + "-1");
        let res = bruteforce(capital+stocks[name].price, energy, year, positions1, bought1, path1, timeline)
        if (res!.capital > best.capital) {
          best.capital = res!.capital;
          best.path = res!.path;
        }
      }
    }

    if (year != 0) {
      let bought1 = new Map<number, Map<string, number>>();
      for (const [key, value] of bought.entries()) {
        bought1.set(key, value);
      }
      let positions1 = new Map<string, number>(positions);
      let path1 = [...path]
      path1.push("j-", (year + 2037).toString(), (year + 2037+1).toString())
      let res = bruteforce(capital, energy-1, year+1, positions1, bought1, path1, timeline)
      if (res!.capital > best.capital) {
        best.capital = res!.capital;
        best.path = res!.path;
      }
    }

    if (year != -2) {
      let bought1 = new Map<number, Map<string, number>>();
      for (const [key, value] of bought.entries()) {
        bought1.set(key, value);
      }
      let positions1 = new Map<string, number>(positions);
      let path1 = [...path]
      path1.push("j-", (year + 2037).toString(), (year + 2037-1).toString())
      let res = bruteforce(capital, energy-1, year-1, positions1, bought1, path1, timeline)
      if (res!.capital > best.capital) {
        best.capital = res!.capital;
        best.path = res!.path;
      }
    }
    return best
}

function hardcode34(testcase:Testcase, stock_names:Set<string>) {
  const { energy, capital, timeline } = testcase;
  let positions = new Map<string, number>()
  let bought = new Map<number, Map<string, number>>()
  bought.set(0, new Map<string, number>());
  bought.set(-1, new Map<string, number>());
  bought.set(-2, new Map<string, number>());
  for (const name of stock_names) {
    console.log(name);
    positions.set(name, 0);
    bought.get(0)!.set(name, 0);
    bought.get(-1)!.set(name, 0);
    bought.get(-2)!.set(name, 0);
  }
  return bruteforce(capital, energy, 0, positions, bought, [], timeline).path
}

export function getStonks(input: Array<Testcase>) {
  let output = []
  for (let i = 0; i < input.length; i++) {
    const { energy, timeline } = input[i];
    let s = new Set<string>()
    let t = new Set<string>()
    for (const time in input[i].timeline) {
      t.add(time)
      let stocks:Stocks = timeline[time as keyof Timeline]
      for (const name in stocks) {
        s.add(name)
      }
    }
    if (t.size <= 3 && energy <= 4) {
      output.push(hardcode34(input[i], s))
    } else {
      output.push([])
    }
  }
  return output
}