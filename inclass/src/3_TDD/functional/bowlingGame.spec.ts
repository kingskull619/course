import { createBowlingGame, Game } from './bowlingGame';

describe('Test bowling game', () => {
  let game: Game
  beforeEach(() => {
    game = createBowlingGame()
  })

  it('should roll a gutter game', () => {
    game = rollMany(game, 20, 0);
    expect(game.getScore()).toBe(0)
  })

  it('should roll all ones', () => {
    game = rollMany(game, 20, 1)
    expect(game.getScore()).toBe(20)
  })

  it('should roll a spare', () => {
    game = game.roll(5).roll(5).roll(3)
    game = rollMany(game, 17, 0)
    expect(game.getScore()).toBe(16)
  })

  it('should roll a strake', () => {
    game = game.roll(10).roll(3).roll(3)
    game = rollMany(game, 17, 0)
    expect(game.getScore()).toBe(22)
  })

  it('should do a perfect game', () => {
    game = rollMany(game, 12, 10)
    expect(game.getScore()).toBe(300)
  })
});

function rollMany(game: Game, rolls: number, pins: number) {
  for (let i = 0; i < rolls; i++) {
    game = game.roll(pins);
  }
  return game;
}
