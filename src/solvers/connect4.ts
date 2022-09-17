import axios from 'axios'

export function connect4Solution(battleId: string) {
  const src = `https://cis2022-arena.herokuapp.com/connect4/start/${battleId}`
  const evtSource = new EventSource(src)

  let myToken = ''

  const postMove = (column: string) => {
    axios.post(src, {
      action: 'putToken',
      column,
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
  evtSource.onmessage = (event: MessageEvent<Message>) => {
    const data = event.data
    if (data.hasOwnProperty('youAre')) {
      // initial event
      myToken = data['youAre']
      if (myToken === '🔴') {
        postMove('A')
      }
    } else if (data.hasOwnProperty('player')) {
      if (data.action === 'putToken') {
        if (data.player !== myToken) {
          postMove('B')
        } else {
          // someone flip table
          /* do nothing */
        }
      }
    } else {
      console.log(
        data.winner === myToken ? 'I won!' : data.winner === 'draw' ? 'draw' : 'I lost ):'
      )
      evtSource.close()
    }
  }
}
