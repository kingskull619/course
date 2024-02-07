import { createBowlingGame } from "./bowlingGame";
describe('Test bowling game', () => {
  let game = createBowlingGame();

  beforeEach(() => {
    game = game.resetState();
  });
  

  it('should allowed to roll a ball', () => {
    expect(game.roll(3)).toBeDefined();
  })

  it('Should roll a gutter game', () => {
    let pins = 0;
    let rolls = 20;
    game = rollMany(rolls, game, pins);


    expect(game.getScore()).toBe(0);
  })


  it('Should roll all ones', () => {
    let pins = 1;
    let rolls = 20;
    game = rollMany(rolls, game, pins);
    expect(game.getScore()).toBe(20);
  })


  it('Should roll a spare', () => {
    game = rollSpare(game);
    game = rollMany(17, game, 0);
    expect(game.getScore()).toBe(16);
  })

  it('Should roll a strike', () => {
    game = rollStrike(game);

    game = rollMany(17, game, 0);
    expect(game.getScore()).toBe(22);
  })

  it('Should roll a perfect game', () => {
    game = rollMany(12, game, 10);
    expect(game.getScore()).toBe(300);
  })
});

function rollMany(rolls: number, game: any, pins: number) {
  let gameDull = game;
  for (let i = 0; i < rolls; i++) {
    gameDull = gameDull.roll(pins);
  }
  return gameDull;
}

function rollStrike(game: any){
  let gameDull = game;
  gameDull = gameDull.roll(10);
  gameDull = gameDull.roll(3);
  gameDull = gameDull.roll(3);
  return gameDull;
}

function rollSpare(game: any){
  let gameDull = game;
  gameDull = gameDull.roll(5);
  gameDull = gameDull.roll(5);
  gameDull = gameDull.roll(3);
  return gameDull;
}
