export type Lookup = Map<string, string>
let compression:Map<string, number>
let lookup:Lookup

export function setLookUp(table: Lookup) {
  lookup = new Map<string, string>()
  compression = new Map<string, number>()
  let index = 0;
  for (const [key, value] of Object.entries(table)) {
    lookup.set(key, value)
    compression.set(key, index);
    index++

  }
}

export function query(cacheSize: number, log: string[]) {
  let count:Map<number, number> = new Map<number, number>()
  let output = [];
  let queue:number[] = [];
  let index:number = 0;
  for(let i = 0; i < log.length; i++) {
    if (lookup.get(log[i]) != undefined) {
      let index1 = compression.get(log[i])!
      if (count.get(index1)) {
        output.push({status: "cache hit", ipAddress: lookup.get(log[i])})
        count.set(index1, count.get(index1)!+1);
        queue.push(index1)
      } else {
        output.push({status: "cache miss", ipAddress: lookup.get(log[i])})
        while(Object.keys(count).length >= cacheSize && Object.keys(count).length != 0) {
          count.set(queue[index], count.get(queue[index])!-1)
          if (count.get(queue[index]) === 0) {
            count.delete(queue[index])
          }
          index++;
        }
        if (cacheSize > Object.keys(count).length) {
          count.set(index1, 1);
          queue.push(index1)
        }
      }
    } else {
      output.push({status: "invalid", ipAddress: null})
    }
  }
  return output
}
