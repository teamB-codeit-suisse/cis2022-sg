export function socialDistancingSolution(input: string): number | string {
  const [width, height, numberOfVisitors, ...occupiedSeats] = input
    .split(',')
    .map((x) => Number.parseInt(x))

  const canSeat: boolean[][] = Array(height)
    .fill(0)
    .map((_) => Array(width).fill(true))
  const dx = [-1, -1, -1, 0, 0, 1, 1, 1]
  const dy = [-1, 0, 1, -1, 1, -1, 0, 1]

  for (let i = 0; i < occupiedSeats.length; i += 2) {
    const y = occupiedSeats[i]
    const x = occupiedSeats[i + 1]
    canSeat[y][x] = false
    for (let j = 0; j < 8; j++) {
      const ny = y + dy[j]
      const nx = x + dx[j]
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
      canSeat[ny][nx] = false
    }
  }
  const v = numberOfVisitors - occupiedSeats.length / 2

  // width * 2^height * (v+1) array
  const dp: number[][][] = Array(width)
    .fill(0)
    .map((_) =>
      Array(2 ** height)
        .fill(0)
        .map((_) => Array(v + 1).fill(0))
    )

  const isValidSeating = (x: number, seating: number) => {
    for (let i = 0; i < height; i++) {
      if ((1 << i) & seating && !canSeat[i][x]) return false
    }
    for (let i = 1; i < height; i++) {
      if ((1 << i) & seating && (1 << (i - 1)) & seating) return false
    }
    return true
  }

  const bitcount = (x: number) => {
    let count = 0
    while (x > 0) {
      if (x & 1) count++
      x >>= 1
    }
    return count
  }

  const isValidConsecutiveSeatings = (x: number, y: number) => {
    for (let i = 0; i < height; i++) {
      if (!((1 << i) & x)) continue
      for (let j = i - 1; j <= i + 1; j++) {
        if (j >= 0 && j < height && (1 << j) & y) return false
      }
    }
    return true
  }

  for (let i = 0; i < 2 ** height; i++) {
    if (isValidSeating(0, i) && bitcount(i) <= v) dp[0][i][bitcount(i)] = 1
  }
  for (let x = 1; x < width; x++) {
    for (let i = 0; i < 2 ** height; i++) {
      if (!isValidSeating(x, i)) continue
      for (let j = bitcount(i); j <= v; j++) {
        for (let k = 0; k < 2 ** height; k++) {
          if (!isValidConsecutiveSeatings(i, k)) continue
          dp[x][i][j] += dp[x - 1][k][j - bitcount(i)]
        }
      }
    }
  }

  let ans = 0
  for (let j = 0; j < 2 ** height; j++) ans += dp[width - 1][j][v]

  if (ans === 0) return 'No Solution'
  return ans
}
