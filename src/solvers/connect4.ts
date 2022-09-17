import axios from 'axios'
import https from 'https'

export async function connect4Solution(battleId: string) {
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

  let timeout: NodeJS.Timeout | undefined
  const play = (payload: unknown): void => {
    timeout = setTimeout(() => {
      axios.post(src, payload).catch(console.error)
    }, 600)
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
          if (data.hasOwnProperty('youAre')) {
            // initial event
            myToken = data['youAre']
            if (myToken === '🔴') {
              addMoveToBoard('D', 1)
              postMove('D')
            }
          } else if (data.hasOwnProperty('action')) {
            if (data.action === 'putToken') {
              if (data.player !== myToken) {
                const valid = addMoveToBoard(data.column, -1)
                if (!valid) {
                  if (timeout !== undefined) {
                    clearTimeout(timeout)
                  }
                  flipTable()
                } else {
                  for (let i = 0; i < 100; i++) {
                    const column = columns[Math.floor(Math.random() * 7)]
                    if (!addMoveToBoard(column, 1)) continue
                    postMove(column)
                    break
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
            if (timeout !== undefined) {
              clearTimeout(timeout)
            }
            req.end()
            resolve()
          }
        } catch (err) {
          console.error(err)
          flipTable()
        }
      })
    })
  })
}
