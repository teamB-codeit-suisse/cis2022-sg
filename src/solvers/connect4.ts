import axios from 'axios'
import https from 'https'
const { Connect4AI } = require('connect4-ai')

const game = new Connect4AI(7, 5)

export async function connect4Solution(battleId: string): Promise<void> {
  const src = `https://cis2022-arena.herokuapp.com/connect4/play/${battleId}`
  const evtSrc = `https://cis2022-arena.herokuapp.com/connect4/start/${battleId}`

  const columns = 'ABCDEFG'

  let myToken = ''

  let timeout: NodeJS.Timeout | undefined
  const play = (payload: unknown): void => {
    timeout = setTimeout(async () => {
      await axios.post(src, payload).catch(console.error)
    }, 500)
  }
  const postMove = (col: number) => {
    const column = columns.charAt(col)
    play({ action: 'putToken', column })
  }
  const flipTable = () => {
    play({ action: '(╯°□°)╯︵ ┻━┻' })
  }
  await new Promise<void>((resolve, _reject) => {
    const req = https.get(evtSrc, (res) => {
      res.on('data', (eventdata) => {
        console.log(game.ascii())
        const text = new TextDecoder('utf-8').decode(eventdata)
        try {
          const data = JSON.parse(text.replace('data: ', ''))
          const { youAre, action } = data
          if (youAre) {
            // initial event
            myToken = data['youAre']
            if (myToken === '🔴') {
              const a = game.playAI('hard')
              postMove(a)
            }
          } else if (action) {
            if (data.action === 'putToken') {
              if (data.player !== myToken) {
                let done = false
                try {
                  game.play(columns.indexOf(data.column))
                } catch {
                  done = true
                }
                if (done) {
                  if (timeout !== undefined) clearTimeout(timeout)
                  flipTable()
                } else {
                  if (game.gameStatus().gameOver) {
                    if (timeout !== undefined) clearTimeout(timeout)
                    flipTable()
                  }
                  const a = game.playAI('hard')
                  postMove(a)
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
