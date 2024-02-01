import {Game, createBowlingGame} from "./bowlingGame"
describe('Test bowling game', () => {
  let game : Game;
  beforeEach(()=>{
    game = createBowlingGame()
  })

  it('Should play a gutter game', () => {
    game = rollMany(game, 20, 0)
    expect( game.score() ).toBe( 0 )
  })

  it('Should roll all ones', () => {
    game = rollMany(game, 20, 1)
    expect( game.score() ).toBe( 20 )
  });

  it('Should roll a spare', () => {
    game = rollSpare(game) 
          .roll(3) 
    game = rollMany(game, 17, 0)
    expect( game.score() ).toBe(16)
  });

  it('Should roll a strike', () => {
    game = rollStrike(game)
      .roll(3)
      .roll(3)
    game = rollMany(game, 16, 0)
    expect(game.score()).toBe(22)
  });

  it('Should do a perfect game', () => {
    game = rollMany(game, 12, 10)
    expect(game.score()).toBe(300)
  });

});

function rollStrike(game: Game) {
  return game.roll(10);
}

function rollSpare(game: Game) {
  return game
    .roll(5)
    .roll(5);
}

function rollMany(game: Game, rolls: number, pins: number) {
  for (let i = 0; i < rolls; i++) {
    game = game.roll(pins);
  }
  return game;
}