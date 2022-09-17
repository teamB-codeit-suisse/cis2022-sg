function rotateFace(matrix: number[][], anticlockwise: boolean): number[][] {
  const result: number[][] = []
  if (anticlockwise) {
    for (let i = matrix[0].length - 1; i >= 0; i--) {
      const row: number[] = []
      for (let j = 0; j < matrix.length; j++) {
        row.push(matrix[j][i])
      }
      result.push(row)
    }
  } else {
    for (let i = 0; i < matrix[0].length; i++) {
      const row: number[] = []
      for (let j = matrix.length - 1; j >= 0; j--) {
        row.push(matrix[j][i])
      }
      result.push(row)
    }
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = result[i][j]
    }
  }
  return matrix
}

function getCol(matrix: number[][], idx: number): number[] {
  const arr: number[] = []
  for (let i = 0; i < 3; i++) arr.push(matrix[i][idx])
  return arr
}

function setCol(matrix: number[][], idx: number, newCol: number[]): number[][] {
  for (let i = 0; i < 3; i++) matrix[i][idx] = newCol[i]
  return matrix
}

export function rubiksSolution(
  ops: string,
  u: number[][],
  l: number[][],
  f: number[][],
  r: number[][],
  b: number[][],
  d: number[][]
): {
  u: number[][]
  l: number[][]
  f: number[][]
  r: number[][]
  b: number[][]
  d: number[][]
} {
  let index = 0
  while (index < ops.length) {
    let inverse = false
    if (index + 1 < ops.length) {
      if (ops.at(index + 1) === 'i') {
        inverse = true
      }
    }
    const curOps = ops.at(index)
    if (curOps == 'U') {
      u = rotateFace(u, inverse)
      const temp = f[0]
      if (inverse) {
        f[0] = l[0]
        l[0] = b[0]
        b[0] = r[0]
        r[0] = temp
      } else {
        f[0] = r[0]
        r[0] = b[0]
        b[0] = l[0]
        l[0] = temp
      }
    } else if (curOps == 'L') {
      l = rotateFace(l, inverse)
      const temp = getCol(f, 0)
      if (inverse) {
        f = setCol(f, 0, getCol(d, 0))
        d = setCol(d, 0, getCol(b, 2).reverse())
        b = setCol(b, 2, getCol(u, 0).reverse())
        u = setCol(u, 0, temp)
      } else {
        f = setCol(f, 0, getCol(u, 0))
        u = setCol(u, 0, getCol(b, 2).reverse())
        b = setCol(b, 2, getCol(d, 0).reverse())
        d = setCol(d, 0, temp)
      }
    } else if (curOps == 'R') {
      r = rotateFace(r, inverse)
      const temp = getCol(f, 2)
      if (!inverse) {
        f = setCol(f, 2, getCol(d, 2))
        d = setCol(d, 2, getCol(b, 0).reverse())
        b = setCol(b, 0, getCol(u, 2).reverse())
        u = setCol(u, 2, temp)
      } else {
        f = setCol(f, 2, getCol(u, 2))
        u = setCol(u, 2, getCol(b, 0).reverse())
        b = setCol(b, 0, getCol(d, 2).reverse())
        d = setCol(d, 2, temp)
      }
    } else if (curOps == 'D') {
      d = rotateFace(d, inverse)
      const temp = f[2]
      if (!inverse) {
        f[2] = l[2]
        l[2] = b[2]
        b[2] = r[2]
        r[2] = temp
      } else {
        f[2] = r[2]
        r[2] = b[2]
        b[2] = l[2]
        l[2] = temp
      }
    } else if (curOps == 'F') {
      f = rotateFace(f, inverse)
      const temp = u[2]
      if (inverse) {
        u[2] = getCol(r, 0)
        r = setCol(r, 0, d[0])
        d[0] = getCol(l, 2)
        l = setCol(l, 2, temp.reverse())
      } else {
        u[2] = getCol(l, 2).reverse()
        l = setCol(l, 2, d[0])
        d[0] = getCol(r, 0).reverse()
        r = setCol(r, 0, temp)
      }
    } else if (curOps == 'B') {
      b = rotateFace(b, inverse)
      const temp = u[0]
      if (inverse) {
        u[0] = getCol(l, 0)
        l = setCol(l, 0, d[2])
        d[2] = getCol(r, 2).reverse()
        r = setCol(r, 2, temp)
      } else {
        u[0] = getCol(r, 2)
        r = setCol(r, 2, d[2].reverse())
        d[2] = getCol(l, 0)
        l = setCol(l, 0, temp.reverse())
      }
    }
    if (inverse) {
      index++
    }
    index++
  }
  return { u, l, f, r, b, d }
}
