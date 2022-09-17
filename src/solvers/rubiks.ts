function rotateFace(matrix: number[][], anticlockwise: boolean) {
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
}

function rotateSide(a: number[], b: number[], c: number[], d: number[], anticlockwise: boolean) {
  const temp = [...a]
  if (anticlockwise) {
    for (let i = 0; i < b.length; i++) {
      a[i] = b[i]
    }
    for (let i = 0; i < c.length; i++) {
      b[i] = c[i]
    }
    for (let i = 0; i < d.length; i++) {
      c[i] = d[i]
    }
    for (let i = 0; i < temp.length; i++) {
      d[i] = temp[i]
    }
  } else {
    for (let i = 0; i < d.length; i++) {
      a[i] = d[i]
    }
    for (let i = 0; i < c.length; i++) {
      d[i] = c[i]
    }
    for (let i = 0; i < b.length; i++) {
      c[i] = b[i]
    }
    for (let i = 0; i < temp.length; i++) {
      b[i] = temp[i]
    }
  }
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
    let l1: number[], b1: number[], r1: number[], f1: number[], u1: number[], d1: number[]
    switch (ops.at(index)) {
      case 'U':
        rotateFace(u, inverse)
        l1 = [...l[0]].reverse()
        b1 = [...b[0]]
        r1 = [...r[0]]
        f1 = [...f[0]]
        rotateSide(l1, b1, r1, f1, inverse)
        l[0] = l1.reverse()
        b[0] = b1
        r[0] = r1
        f[0] = f1
        break
      case 'L':
        rotateFace(l, inverse)
        u1 = u.map(function (value, _) {
          return value[0]
        })
        f1 = f.map(function (value, _) {
          return value[0]
        })
        d1 = d.map(function (value, _) {
          return value[0]
        })
        b1 = b
          .map(function (value, _) {
            return value[0]
          })
          .reverse()
        rotateSide(f1, d1, b1, u1, inverse)
        b1 = b1.reverse()
        for (let i = 0; i < u1.length; i++) u[i][0] = u1[i]
        for (let i = 0; i < f1.length; i++) f[i][0] = f1[i]
        for (let i = 0; i < d1.length; i++) d[i][0] = d1[i]
        for (let i = 0; i < b1.length; i++) b[i][0] = b1[i]
        break
      case 'F':
        rotateFace(f, inverse)
        u1 = [...u[2]]
        d1 = [...d[0]].reverse()
        l1 = l
          .map(function (value, _) {
            return value[2]
          })
          .reverse()
        r1 = r.map(function (value, _) {
          return value[0]
        })
        rotateSide(u1, r1, d1, l1, inverse)
        l1 = l1.reverse()
        u[2] = u1
        for (let i = 0; i < l1.length; i++) l[i][2] = l1[i]
        d[0] = d1.reverse()
        for (let i = 0; i < r1.length; i++) r[i][0] = r1[i]
        break
      case 'R':
        rotateFace(r, inverse)
        u1 = u
          .map(function (value, _) {
            return value[2]
          })
          .reverse()
        f1 = f
          .map(function (value, _) {
            return value[2]
          })
          .reverse()
        d1 = d.map(function (value, _) {
          return value[2]
        })
        b1 = b
          .map(function (value, _) {
            return value[2]
          })
          .reverse()
        rotateSide(f1, u1, b1, d1, inverse)
        u1 = u1.reverse()
        f1 = f1.reverse()
        b1 = b1.reverse()
        for (let i = 0; i < u1.length; i++) u[i][2] = u1[i]
        for (let i = 0; i < f1.length; i++) f[i][2] = f1[i]
        for (let i = 0; i < d1.length; i++) d[i][2] = d1[i]
        for (let i = 0; i < b1.length; i++) b[i][2] = b1[i]
        break
      case 'B':
        rotateFace(b, inverse)
        u1 = [...u[0]].reverse()
        d1 = [...d[2]]
        l1 = l.map(function (value, _) {
          return value[0]
        })
        r1 = r
          .map(function (value, _) {
            return value[2]
          })
          .reverse()
        rotateSide(u1, l1, d1, r1, inverse)
        u1 = u1.reverse()
        r1 = r1.reverse()
        u[0] = u1
        for (let i = 0; i < l1.length; i++) l[i][0] = l1[i]
        d[2] = d1
        for (let i = 0; i < r1.length; i++) r[i][2] = r1[i]
        break
      case 'D':
        rotateFace(d, inverse)
        rotateSide(l[2], f[2], r[2], b[2], inverse)
        break
    }
    if (inverse) {
      index++
    }
    index++
  }
  return { u, l, f, r, b, d }
}
