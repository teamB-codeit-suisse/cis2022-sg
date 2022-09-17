export type Lookup = {[key:string]: string};
let compression: {[key:string]: number} = {}
let lookup:Lookup = {}

export function setLookUp(table: Lookup) {
  lookup = table;
  compression = {};
  let index = 0;
  for (const [key, _] of Object.entries(lookup)) {
    compression[key] = index;
    index++
  }
}

export function query(cacheSize: number, log: string[]) {
  let count: {[key:number]: number}= {};
  let output = [];
  let queue:number[] = [];
  let index:number = 0;
  console.log(log.length)
  for(let i = 0; i < log.length; i++) {
    if (log[i] in lookup) {
      let index1 = compression[log[i]]
      if (log[i] in count) {
        output.push({status: "cache hit", ipaddress: lookup[log[i]]})
        count[index1]++;
      } else if (Object.keys(count).length < cacheSize) {
        output.push({status: "cache miss", ipaddress: lookup[log[i]]})
        count[index1] = 1;
      } else {
        output.push({status: "cache miss", ipaddress: lookup[log[i]]})
        while(Object.keys(count).length >= cacheSize && Object.keys(count).length != 0) {
          count[queue[index]]--;
          if (count[queue[index]] === 0) {
            delete count[queue[index]]
          }
          index++;
        }
      }
      queue.push(index1)
    } else {
      output.push({status: "invalid", ipaddress: null})
    }
  }
  return output
}