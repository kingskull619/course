import { BowlingGame } from "./BowlingGame";

describe('Test Bowling Game OOP', () => {
  
  let game: BowlingGame
  beforeEach(()=>{
    game = new BowlingGame()
  })

  it('Should roll a gutter game', ()=>{
    rollMany(game, 20, 0);
    expect(game.getScore()).toBe(0)
  })

  it('Should roll all ones', ()=>{
    rollMany(game, 20, 1);
    expect(game.getScore()).toBe(20)
  })

  it('Should roll a spare', ()=>{
    rollSpare(game)
    game.roll(3)

    rollMany(game, 17, 0)
    expect(game.getScore()).toBe(16)
  })

  it('Should roll a strike', () =>{
    rollStrike(game)
    .roll(3)
    .roll(3)

    rollMany(game, 16, 0)
    expect(game.getScore()).toBe(22)
  })

  it('Should do a perfect game', () =>{
    rollMany(game, 12, 10)
    expect(game.getScore()).toBe(300)
  })

});

function rollSpare(game: BowlingGame) {
  return game
    .roll(5)
    .roll(5);
}

function rollStrike(game: BowlingGame){
  return game
    .roll(10)
}

function rollMany(game: BowlingGame,rolls: number, pins: number) {
  for (let i = 0; i < rolls; i++) {
    game.roll(pins);
  }
}