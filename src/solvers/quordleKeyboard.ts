const A_CHAR = 'A'.charCodeAt(0)
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function quordleKeyboardSolution(answers: string[], attempts: string[], numbers: number[]) {
  const frequencyInAnswer = Array(26).fill(0)
  for (const answer of answers) {
    for (const c of answer) {
      const x = c.charCodeAt(0) - A_CHAR
      frequencyInAnswer[x]++
    }
  }
  const solved = Array(4).fill(false)

  const part1Array = Array(26).fill(0)
  for (let [index, attempt] of attempts.entries()) {
    for (let i = 0; i < 4; i++) {
      if (solved[i]) continue
      if (attempt !== answers[i]) continue
      solved[i] = true
      for (const c of answers[i]) {
        const x = c.charCodeAt(0) - A_CHAR
        frequencyInAnswer[x]--
        if (frequencyInAnswer[x] === 0) part1Array[x] = attempts.length - index
      }
    }

    for (const c of attempt) {
      const x = c.charCodeAt(0) - A_CHAR
      if (frequencyInAnswer[x] === 0)
        part1Array[x] = Math.max(part1Array[x], attempts.length - index)
    }
  }

  let leftovers = ''
  for (let i = 0; i < part1Array.length; i++) {
    if (!part1Array[i]) leftovers += ALPHABET[i]
  }
  const part1 = part1Array.filter((x) => x !== 0).join('')

  let part2 = ''
  for (let i = 0; i < numbers.length; i += 5) {
    let num = 0
    for (let j = i; j < i + 5; j++) {
      num *= 2
      if (part1.includes(numbers[j].toString())) num += 1
    }
    part2 += ALPHABET[num - 1]
  }
  part2 += leftovers

  return { part1, part2 }
}
