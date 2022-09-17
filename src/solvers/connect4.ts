import axios from 'axios'
import https from 'https'
const { Connect4AI } = require('connect4-ai')

const game = new Connect4AI(7, 5)

export async function connect4Solution(battleId: string): Promise<void> {
  const src = `https://cis2022-arena.herokuapp.com/connect4/play/${battleId}`
  const evtSrc = `https://cis2022-arena.herokuapp.com/connect4/start/${battleId}`

  const board: number[][] = Array(6)
    .fill(0)
    .map((_) => Array(7).fill(0))
  const columns = 'ABCDEFG'
  const addMoveToBoard = (column: string, player: number, done = false) => {
    const c = columns.indexOf(column)
    let placed = false
    for (let i = 5; !placed && i >= 0; i--) {
      if (board[i][c] !== 0) continue
      board[i][c] = player
      placed = true
    }
    if (placed && !done) game.play(c)
    return placed
  }

  // const checkLost = () => {
  //   for (let i = 0; i < 7; i++) {
  //     let cnt = 0
  //     for (let j = 0; j < 5; j++) {
  //       if (board[j][i] == -1) cnt++
  //       else cnt = 0
  //       if (cnt == 4) return true
  //     }
  //   }
  //   for (let i = 0; i < 5; i++) {
  //     let cnt = 0
  //     for (let j = 0; j < 7; j++) {
  //       if (board[i][j] == -1) cnt++
  //       else cnt = 0
  //       if (cnt == 4) return true
  //     }
  //   }
  //   for (let i = 3; i < 5; i++) {
  //     for (let j = 3; j < 7; j++) {
  //       let cnt = 0
  //       for (let k = 0; k < 4; k++) {
  //         if (board[i - k][j - k] == -1) cnt++
  //       }
  //       if (cnt == 4) return true
  //     }
  //     for (let j = 0; j < 3; j++) {
  //       let cnt = 0
  //       for (let k = 0; k < 4; k++) {
  //         if (board[i - k][j + k] == -1) cnt++
  //       }
  //       if (cnt == 4) return true
  //     }
  //   }
  //   return false
  // }
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

  let timeout: NodeJS.Timeout | undefined
  const play = (payload: unknown): void => {
    timeout = setTimeout(async () => {
      await axios.post(src, payload).catch(console.error)
    }, 500)
  }
  const postMove = (column: string) => {
    play({ action: 'putToken', column })
  }
  const flipTable = () => {
    play({ action: '(╯°□°)╯︵ ┻━┻' })
  }
  await new Promise<void>((resolve, _reject) => {
    const req = https.get(evtSrc, (res) => {
      res.on('data', (eventdata) => {
        const text = new TextDecoder('utf-8').decode(eventdata)
        try {
          const data = JSON.parse(text.replace('data: ', ''))
          const { youAre, action } = data
          if (youAre) {
            // initial event
            myToken = data['youAre']
            if (myToken === '🔴') {
              const a = game.playAI('hard')
              addMoveToBoard(columns.charAt(a), 1, true)
              postMove(columns.charAt(a))
            }
          } else if (action) {
            if (data.action === 'putToken') {
              if (data.player !== myToken) {
                const valid = addMoveToBoard(data.column, -1)
                if (!valid) {
                  if (timeout !== undefined) clearTimeout(timeout)
                  flipTable()
                } else {
                  if (game.gameStatus().gameOver) {
                    if (timeout !== undefined) clearTimeout(timeout)
                    flipTable()
                  }
                  const a = game.playAI('hard')
                  addMoveToBoard(columns.charAt(a), 1, true)
                  postMove(columns.charAt(a))
                }
              } else {
                // my move
                // do nothing
              }
            } else {
              // someone flip table
              if (timeout !== undefined) clearTimeout(timeout)
            }
          } else {
            // end of game
            console.log(data)
            if (timeout !== undefined) clearTimeout(timeout)
            req.end()
            resolve()
          }
        } catch (err) {
          console.error(err)
          if (timeout !== undefined) clearTimeout(timeout)
          flipTable()
        }
      })
    })
  })
}
