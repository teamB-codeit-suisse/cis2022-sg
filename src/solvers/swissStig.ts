export type Question = {
  lower: number
  upper: number
}

export type InterviewPart1 = {
  questions: Question[]
  maxRating: number
}

export type InterviewPart2 = {
  questions: Question[]
  maxRating: number
}

export type Accuracy = {
  p: number
  q: number
}

const gcd = (a: number, b: number): number => {
  if (a == 0) {
    return b
  }
  if (b == 0) {
    return a
  }
  return gcd(b, a % b)
}

export function swissStigPart1Solution(input: InterviewPart1[]): Accuracy[] {
  const output: Accuracy[] = []
  for (let i = 0; i < input.length; i++) {
    const values = new Set([1])
    input[i].questions.sort(function (a: Question, b: Question) {
      return a.upper - b.upper
    })
    const visited: boolean[] = new Array(input[i].maxRating).fill(true)
    for (let j = 0; j < input[i].questions.length; j++) {
      values.add(input[i].questions[j].lower)
      for (let k = input[i].questions[j].lower; k <= input[i].questions[j].upper; k++) {
        visited[k - 1] = false
      }
    }
    for (let j = 0; j < input[i].questions.length; j++) {
      if (
        input[i].questions[j].upper + 1 >= 1 &&
        input[i].questions[j].upper + 1 <= input[i].maxRating
      ) {
        values.add(input[i].questions[j].upper + 1)
      }
    }

    const g: number = gcd(values.size, input[i].maxRating)
    output.push({ p: values.size / g, q: input[i].maxRating / g })
  }
  return output
}

export function swissStigPart2Solution(_input: InterviewPart2[]): void {
  return
}
