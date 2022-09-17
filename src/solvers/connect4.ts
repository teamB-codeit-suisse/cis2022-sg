import axios from 'axios'
import https from 'https'
import Connect4 from 'connect4-ai'

export async function connect4Solution(battleId: string) {
  const src = `https://cis2022-arena.herokuapp.com/connect4/play/${battleId}`
  const evtSrc = `https://cis2022-arena.herokuapp.com/connect4/start/${battleId}`

  const columns = 'ABCDEFG'
  const game = new (Connect4.Connect4AI as any)()

  let myToken = ''

  let timeout: NodeJS.Timeout | undefined
  const play = (payload: unknown): void => {
    timeout = setTimeout(() => {
      axios.post(src, payload).catch(console.error)
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
          if (data.hasOwnProperty('youAre')) {
            // initial event
            myToken = data['youAre']
            if (myToken === '🔴') {
              game.playAI('hard')
              postMove(columns[game.plays[game.plays.length - 1]])
            }
          } else if (data.hasOwnProperty('action')) {
            if (data.action === 'putToken') {
              if (data.player !== myToken) {
                const valid = game.canPlay(columns.indexOf(data.column))
                if (!valid) {
                  if (timeout !== undefined) clearTimeout(timeout)
                  flipTable()
                } else {
<<<<<<< HEAD
                  for (let i = 0; i < 100; i++) {
                    const column = columns[Math.floor(Math.random() * 7)]
                    if (!addMoveToBoard(column, 1)) continue
                    postMove(column)
                    break
                  }
=======
                  game.play(columns.indexOf(data.column))
                  game.playAI('hard')
                  postMove(columns[game.plays[game.plays.length - 1]])
>>>>>>> e292be8 (fix)
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
