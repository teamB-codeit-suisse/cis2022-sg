const DESIRED_STRING = 'CODEITSUISSE'
const ROBOT_STRING = 'X'

type Position = {
  x: number
  y: number
}

function getDistance(a: Position, b: Position) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

function getInstructions(a: Position, b: Position) {
  let ans = ''
  if (a.y < b.y) ans += 'LL'
  ans += 'S'.repeat(Math.abs(a.y - b.y))
  if (a.y < b.y) ans += 'LL'
  if (a.x > b.x) ans += 'L'
  else if (a.x < b.x) ans += 'R'
  ans += 'S'.repeat(Math.abs(a.x - b.x))
  if (a.x > b.x) ans += 'R'
  else if (a.x < b.x) ans += 'L'
  return ans
}

function solve(
  index: number,
  currentPosition: Position,
  letterPositions: Record<string, (Position & { used: boolean })[]>
): { distance: number; instructions: string } {
  if (index >= DESIRED_STRING.length) return { distance: 0, instructions: '' }
  const letter = DESIRED_STRING[index]
  let ansDistance = -1
  let ansInstructions = ''
  for (const nextPosition of letterPositions[letter]) {
    if (nextPosition.used) continue
    nextPosition.used = true
    const { distance, instructions } = solve(index + 1, nextPosition, letterPositions)
    if (ansDistance === -1 || distance + getDistance(currentPosition, nextPosition) < ansDistance) {
      ansDistance = distance + getDistance(currentPosition, nextPosition)
      ansInstructions = getInstructions(currentPosition, nextPosition) + 'P' + instructions
    }
  }
  return { distance: ansDistance, instructions: ansInstructions }
}

export function travellingSuisseRobotSolution(mapString: string): string {
  const map = mapString.split('\n')
  const letterPositions: Record<string, (Position & { used: boolean })[]> = {}
  const initialRobotPosition = { x: 0, y: 0 }
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const letter = map[y][x]
      if (DESIRED_STRING.includes(letter)) {
        if (!letterPositions.hasOwnProperty(letter)) letterPositions[letter] = []
        letterPositions[letter].push({ x, y, used: false })
      } else if (ROBOT_STRING === letter) {
        initialRobotPosition.x = x
        initialRobotPosition.y = y
      }
    }
  }

  const { instructions } = solve(0, initialRobotPosition, letterPositions)
  console.log(instructions)
  return instructions
}
