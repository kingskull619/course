import { createBowlingGame } from "./bowlingGame";

describe('Test Bowling Game Functional', () => {
  let game = createBowlingGame()

  beforeEach(() => {
    game = game.resetState()
  })

  it('should roll a gutter game', () => {
    game = rollManyTimes(20, 0, game);
    expect(game.getFinalScore()).toBe(0)
  })

  it('should roll all ones', () => {
    game = rollManyTimes(20, 1, game);
    expect(game.getFinalScore()).toBe(20)
  })

  it('should roll a spare', () => {
    game = rollSpare(game)
    game = game.rollBall(3)

    game = rollManyTimes(17, 0, game);
    expect(game.getFinalScore()).toBe(16)
  })

  it('should roll a strike', () => {
    game = game.rollBall(10)
    game = game.rollBall(3)
    game = game.rollBall(3)

    game = rollManyTimes(16, 0, game);
    expect(game.getFinalScore()).toBe(22)
  })

  it('should be a perfect game', () => {
    game = rollManyTimes(12, 10, game);
    expect(game.getFinalScore()).toBe(300)
  })
});

function rollSpare(game: any) {
  game = game.rollBall(5)
  game = game.rollBall(5)
  return game
}

function rollManyTimes(rolls: number, pins: number, game: any) {
  for (let i = 0; i < rolls; i++) {
    game = game.rollBall(pins);
  }
  return game
}
