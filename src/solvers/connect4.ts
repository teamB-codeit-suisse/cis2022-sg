import axios from 'axios'
import https from 'https'
import Connect4 from 'connect4-ai'

async function connect4Solution(battleId: string): Promise<void> {
  const src = `https://cis2022-arena.herokuapp.com/connect4/play/${battleId}`
  const evtSrc = `https://cis2022-arena.herokuapp.com/connect4/start/${battleId}`

  const columns = 'ABCDEFG'
  const game = new (Connect4.Connect4AI as any)()
  game.recursiveDepthLimit = 2

  let myToken = ''

  let timeout: NodeJS.Timeout | undefined
  const play = (payload: unknown): void => {
    timeout = setTimeout(async () => {
      await axios.post(src, payload).catch(console.error)
    }, 100)
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
          if (data.youAre) {
            // initial event
            myToken = data['youAre']
            if (myToken === '🔴') {
              game.playAI('hard')
              postMove(columns[game.plays[game.plays.length - 1]])
            }
          } else if (data.action) {
            if (data.action === 'putToken') {
              if (data.player !== myToken) {
                const valid = game.canPlay(columns.indexOf(data.column))
                if (!valid) {
                  if (timeout !== undefined) clearTimeout(timeout)
                  flipTable()
                } else {
                  game.play(columns.indexOf(data.column))
                  if (game.gameStatus().gameOver) {
                    if (timeout !== undefined) clearTimeout(timeout)
                    flipTable()
                  } else {
                    game.playAI('hard')
                    postMove(columns[game.plays[game.plays.length - 1]])
                  }
                }
              } else {
                // my move
                // do nothing
              }
            } else {
              // someone flip table
              if (data.player !== myToken) {
                if (timeout !== undefined) clearTimeout(timeout)
                flipTable()
              }
            }
          } else if (data.winner) {
            // end of game
            console.log(data)
            if (data.winner !== 'draw' && data.winner !== myToken) {
              if (timeout !== undefined) clearTimeout(timeout)
              flipTable()
            }
            req.end()
            resolve()
          } else {
            // ignore other events
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

module.exports = connect4Solution
