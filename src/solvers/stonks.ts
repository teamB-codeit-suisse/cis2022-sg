export type testcase = {
  energy: number,
  capital: number,
  timeline: {}
}

export function getStonks(input: testcase[]) {
  for (let i = 0; i < input.length; i++) {
    console.log(input[i])
  }
  return []
}