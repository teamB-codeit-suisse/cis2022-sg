export type Lookup = Map<string, string>
let compression: Map<string, number> = new Map<string, number>()
let lookup: Lookup = new Map<string, string>()

export function setLookUp(table: Lookup): void {
  lookup = new Map<string, string>()
  compression = new Map<string, number>()
  let index = 0
  for (const [key, value] of Object.entries(table)) {
    lookup.set(key, value)
    compression.set(key, index)
    index++
  }
}

type ipResponse = {
  status: string
  ipAddress?: string | null
}

export function query(cacheSize: number, log: string[]): ipResponse[] {
  const count: Map<number, number> = new Map<number, number>()
  const output: ipResponse[] = []
  const queue: number[] = []
  let index = 0
  for (let i = 0; i < log.length; i++) {
    if (lookup.get(log[i]) != undefined) {
      const index1 = compression.get(log[i])!
      if (count.get(index1)) {
        output.push({ status: 'cache hit', ipAddress: lookup.get(log[i]) })
        count.set(index1, count.get(index1)! + 1)
        queue.push(index1)
      } else {
        output.push({ status: 'cache miss', ipAddress: lookup.get(log[i]) })
        while (count.size >= cacheSize && count.size != 0) {
          count.set(queue[index], count.get(queue[index])! - 1)
          if (count.get(queue[index]) === 0) {
            count.delete(queue[index])
          }
          index++
        }
        if (cacheSize > count.size) {
          count.set(index1, 1)
          queue.push(index1)
        }
      }
    } else {
      output.push({ status: 'invalid', ipAddress: null })
    }
  }
  return output
}
