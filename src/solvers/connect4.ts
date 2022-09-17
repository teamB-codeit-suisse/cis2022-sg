import axios from 'axios'
import EventSource from 'eventsource'

export function connect4Solution(battleId: string) {
  const src = `https://cis2022-arena.herokuapp.com/connect4/start/${battleId}`
  const playSrc = `https://cis2022-arena.herokuapp.com/connect4/play/${battleId}`
  const evtSource = new EventSource(src)

  let myToken = ''

  const postMove = (column: string) => {
    axios
      .post(playSrc, {
        action: 'putToken',
        column,
      })
      .catch((err) => {
        console.log(err)
      })
  }

  type Message = {
    youAre: string
    id: string
    player: string
    action: string
    column: string
    winner: string
  }
  let count = 0
  evtSource.onmessage = (event: MessageEvent<string>) => {
    console.log(event)
    count++
    if (count > 100) evtSource.close()

    const data = JSON.parse(event.data) as Message
    if (data.hasOwnProperty('youAre')) {
      // initial event
      myToken = data['youAre']
      if (myToken === '🔴') {
        postMove('D')
      }
    } else if (data.hasOwnProperty('player')) {
      if (data.action === 'putToken') {
        if (data.player !== myToken) {
          postMove('ABCDEFG'[Math.floor(Math.random() * 7)])
        } else {
          // someone flip table
          /* do nothing */
        }
      }
    } else {
      evtSource.close()
    }
  }
}
