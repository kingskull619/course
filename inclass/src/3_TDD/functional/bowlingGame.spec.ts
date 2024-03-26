import { createBowlingGame } from "./bowlingGame";

describe("Test bowling game", () => {
    let bowlingGame = createBowlingGame();

    beforeEach(() => (bowlingGame = createBowlingGame()));

    it("should roll a gutter game", () => {
        bowlingGame = rollMany(20, 0);

        expect(bowlingGame.getFinalScore()).toBe(0);
    });

    it("should roll a game of 1", () => {
        bowlingGame = rollMany(20, 1);

        expect(bowlingGame.getFinalScore()).toBe(20);
    });

    it("should roll a spare", () => {
        bowlingGame = bowlingGame.roll(5).roll(5).roll(4);

        bowlingGame = rollMany(17, 0);

        expect(bowlingGame.getFinalScore()).toBe(18);
    });

    it("should roll a strike",()=>{
      bowlingGame = bowlingGame.roll(10).roll(5).roll(4);

      bowlingGame = rollMany(17,0);

      expect(bowlingGame.getFinalScore()).toBe(28);

    })

    it("should do a perfect game",()=>{
        bowlingGame = rollMany(12, 10);

        expect(bowlingGame.getFinalScore()).toBe(300);
    })

    it("should do a spare on last frame",()=>{
        bowlingGame = rollMany(18, 0)

        bowlingGame = bowlingGame.roll(5).roll(5).roll(4)

        expect(bowlingGame.getFinalScore()).toBe(14)
    })

    function rollMany(totalRolls: number, pinsPerRoll: number) {
        for (let i = 0; i < totalRolls; i++) {
            bowlingGame = bowlingGame.roll(pinsPerRoll);
        }
        return bowlingGame;
    }
});
