export type Question = {
  lower: number,
  higher: number
}

export type InterviewPart1 = {
  questions: Question[],
  maxRating: number
}

export type InterviewPart2 = {
  questions: Question[],
  maxRating: number
}

export type Accuracy = {
  p: number,
  q: number
}

let gcd : (a: number, b: number) => number = function(a: number, b: number) {
  if (a == 0) {
    return b;
  }
  if (b == 0) {
    return a;
  }
  return gcd(b, a % b);
}

export function swissStigPart1Solution (input: InterviewPart1[]) {
  const output : Accuracy[] = [];
  for (let i = 0; i < input.length; i++) {
    const values = new Set([1]);
    for (let j = 0; j < input[i].questions.length; j++) {
      if (input[i].questions[j].lower >= 1 && input[i].questions[j].lower <= input[i].maxRating) {
        values.add(input[i].questions[j].lower);
      }
      if (input[i].questions[j].higher + 1 >= 1 && input[i].questions[j].higher + 1 <= input[i].maxRating) {
        values.add(input[i].questions[j].higher + 1);
      }
    }
    let g:number = gcd(values.size, input[i].maxRating);
    output.push({p: values.size/g, q : input[i].maxRating/g})
  }
  return output;
}

export function swissStigPart2Solution(input: InterviewPart2[]) {
  input
}