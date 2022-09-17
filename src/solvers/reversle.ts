export function reverslePart1Solution(equationLength: number, _attemptsAllowed: number): string[] {
  if (equationLength === 12) return '56*9-3+1/=24'.split('')
  else if (equationLength === 10) return '56*9-3+=24'.split('')
  else if (equationLength === 9) return '34*9-2+=5'.split('')
  else if (equationLength === 8) return '56*9-=21'.split('')
  else return []
}

const CONSTRAINTS = {
  digits: '0123456789'.split(''),
  operators: '+-*/\\^'.split(''),
  both: '0123456789+-*/\\^'.split(''),
  equals: ['='],
}
export function reverslePart2Solution(
  equationLength: number,
  equationHistory: string[][],
  resultHistory: string[][],
  _attemptsLeft: number
) {
  let constraints: Set<string>[] = Array(equationLength)
  constraints[0] = new Set(CONSTRAINTS.digits.slice())
  constraints[1] = new Set(CONSTRAINTS.digits.slice())
  for (let i = 2; i < equationLength; i++)
    constraints[i] = new Set([...CONSTRAINTS.digits.slice(), ...CONSTRAINTS.operators.slice()])
  for (let i = 1; i < equationLength - 1; i += 2) constraints[i].add('=')

  // reduce constraints from previous results
  for (let i = 0; i < equationHistory.length; i++) {
    const equation = equationHistory[i]
    const result = resultHistory[i]

    const freq: Record<string, number> = {}
    for (let j = 0; j < equationLength; j++) {
      if (!freq.hasOwnProperty(equation[j])) freq[equation[j]] = 0
      freq[equation[j]] += result[j] === '2' ? 2 : result[j] === '1' ? 1 : 0
      if (result[j] === '2') {
        constraints[j] = new Set([equation[j]])
        if (equation[j] === '=') constraints.forEach((constraint) => constraint.delete('='))
        for (let k = j + 1; k < equationLength; k++) {
          CONSTRAINTS.operators.forEach((operator) => constraints[k].delete(operator))
        }
      } else constraints[j].delete(equation[j])
    }
    for (const key in freq) {
      if (freq[key] === 0) constraints.forEach((constraint) => constraint.delete(key))
    }
  }

  // generate any new equation according to constraints
  const checkValid = (equation: string): boolean => {
    const equalPosition = equation.indexOf('=')
    const lhs = equation.slice(0, equalPosition)
    const rhs = equation.slice(equalPosition + 1)

    const stack: number[] = []
    for (const c of lhs) {
      if (CONSTRAINTS.digits.includes(c)) stack.push(Number.parseInt(c))
      else {
        if (stack.length < 2) return false
        const y = stack.pop() as number
        const x = stack.pop() as number
        if (c === '+') stack.push(x + y)
        if (c === '-') stack.push(x - y)
        if (c === '*') stack.push(x * y)
        if (c === '/') stack.push(x / y)
        if (c === '\\') stack.push(y / x)
        if (c === '^') stack.push(x ** y)
      }
    }
    if (stack.length !== 1) return false
    const left = stack[0]
    const right = Number.parseInt(rhs)
    if (!Number.isInteger(left)) return false
    if (!Number.isFinite(left)) return false
    return left === right
  }

  const startTime = Date.now()
  let stop = false
  const generate = (index: number, currentEquation: string, hitEquals: boolean): string | null => {
    if (stop) return null
    if (index === equationLength) {
      if (!hitEquals) return null
      if (Date.now() - startTime > 10000) stop = true
      if (!checkValid(currentEquation)) return null
      return currentEquation
    }
    for (const candidate of constraints[index].values()) {
      if (hitEquals && candidate === '=') continue
      if (hitEquals && CONSTRAINTS.operators.includes(candidate)) continue
      const nextEquation = generate(
        index + 1,
        currentEquation + candidate,
        hitEquals || candidate === '='
      )
      if (nextEquation !== null) return nextEquation
    }
    return null
  }

  return (generate(0, '', false) ?? '').split('')
}
