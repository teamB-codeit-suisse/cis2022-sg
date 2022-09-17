import axios from 'axios'
import https from 'https'

export function connect4Solution(battleId: string): void {
  const src = `https://cis2022-arena.herokuapp.com/connect4/play/${battleId}`
  const evtSrc = `https://cis2022-arena.herokuapp.com/connect4/start/${battleId}`

  const board: number[][] = Array(6)
    .fill(0)
    .map((_) => Array(7).fill(0))
  const columns = 'ABCDEFG'
  const addMoveToBoard = (column: string, player: number) => {
    const c = columns.indexOf(column)
    let placed = false
    for (let i = 5; !placed && i >= 0; i--) {
      if (board[i][c] !== 0) continue
      board[i][c] = player
      placed = true
    }
    return placed
  }
  /*
  const removeFromBoard = (column: string) => {
    const c = columns.indexOf(column)
    for (let i = 0; i < 6; i++) {
      if (board[i][c] === 0) continue
      board[i][c] = 0
      return
    }
  }
  */

  let myToken = ''

  const postMove = (column: string) => {
    setTimeout(async () => {
      await axios
        .post(src, {
          action: 'putToken',
          column,
        })
        .catch((err) => {
          console.log(err)
        })
    }, 500)
  }
  const flipTable = () => {
    setTimeout(() => {
      axios
        .post(src, {
          action: '(╯°□°)╯︵ ┻━┻',
        })
        .catch((err) => {
          console.log(err)
        })
    }, 500)
  }

  type Message = {
    youAre?: string
    id: string
    player?: string
    action: string
    column: string
    winner: string
  }
  const req = https.get(evtSrc, (res) => {
    res.on('data', (eventdata) => {
      const text = new TextDecoder('utf-8').decode(eventdata)
      const data = JSON.parse(text.replace('data: ', '')) as Message
      const { youAre, player } = data
      if (youAre) {
        // initial event
        myToken = youAre
        if (myToken === '🔴') {
          addMoveToBoard('D', 1)
          postMove('D')
        }
      } else if (player) {
        if (data.action === 'putToken') {
          if (player !== myToken) {
            const valid = addMoveToBoard(data.column, -1)
            if (!valid) flipTable()
            else {
              for (let i = 0; i < 100; i++) {
                const column = columns[Math.floor(Math.random() * 7)]
                if (!addMoveToBoard(column, 1)) continue
                postMove(column)
                break
              }
              for (const col of columns) {
                if (addMoveToBoard(col, 1)) {
                  postMove(col)
                  break
                }
              }
            }
          } else {
            // my move
            // do nothing
          }
        } else {
          // someone flip table
          // do nothing
        }
      } else {
        console.log(eventdata)
        req.end()
      }
    })
  })
}
