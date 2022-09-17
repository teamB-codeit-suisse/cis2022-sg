declare module 'connect4-ai' {
  class Connect4AI {
    playAI(s: string): void
    play(c: number): void
    plays: number[]
    canPlay(c: number): boolean
  }
  const _exported: { Connect4AI: Connect4AI }
  export = _exported
}
