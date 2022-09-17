export type Lookup = {[key:string]: string};

let lookup:Lookup = {}

export function setLookUp(table: Lookup) {
  lookup = table;
}

export function query(cacheSize: number, log: string[]) {
  let count: {[key:string]: number}= {};
  let output = [];
  let queue:string[] = [];
 
  for(let i = 0; i < log.length; i++) {
    if (log[i] in lookup) {    
       if (log[i] in count) {
        output.push({status: "cache hit", ipaddress: lookup[log[i]]})
        count[log[i]]++;
      } else if (Object.keys(count).length < cacheSize) {
        output.push({status: "cache miss", ipaddress: lookup[log[i]]})
        count[log[i]] = 1;
      } else {
        output.push({status: "cache miss", ipaddress: lookup[log[i]]})
        while(Object.keys(count).length >= cacheSize && Object.keys(count).length != 0) {
          count[queue[0]]--;
          if (count[queue[0]] === 0) {
            delete count[queue[0]]
          }
          queue.shift()
        }
      }
      queue.push(log[i])
    } else {
      output.push({status: "invalid", ipaddress: null})
    }
  }
  return output
}