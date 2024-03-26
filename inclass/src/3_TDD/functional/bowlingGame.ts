/* Remember that all your functions have to respect the functional programming rules:
 *  - 🔥 Pure functions and side effects 
 *  - 🔥 First class functions & higher order functions
 *  - 🔥 Immutability ⚠️
 *  - 🔥 Composition 
 *
 * See more info here: 
 * https://www.learningjournal.guru/courses/scala/scala-programming-foundation/elements-of-functional-programming-1/
 * 
 * I'm putting a warning in Immutability to remember you that every time you try
 * to change the state var... just be careful...⚠️
 */

type GameState = { rolls: any[]}
const INITIAL_GAME_STATE: GameState = {rolls: []}

const CURRENT_FRAME_FIRST_ROLL_INDEX = 0;
const CURRENT_FRAME_SECOND_ROLL_INDEX = 1;

const NEXT_FRAME_FIRST_ROLL_INDEX = CURRENT_FRAME_SECOND_ROLL_INDEX + 1;
const NEXT_FRAME_SECOND_ROLL_INDEX = CURRENT_FRAME_SECOND_ROLL_INDEX + 2;

const STRIKE_ROLL_SCORE = 10;

export const createBowlingGame = (gameState: GameState = INITIAL_GAME_STATE) => Object.freeze({

  roll: (pinsRolled:number) => {
    return createBowlingGame({rolls: [...gameState.rolls, pinsRolled]})
  },

  getFinalScore: (totalRolls: any[] = gameState.rolls)=>{
    
    if(totalRolls.length == 0) return 0;

    if(totalRolls.length == 1) return totalRolls[CURRENT_FRAME_FIRST_ROLL_INDEX];

    const firstRoll: number = totalRolls[CURRENT_FRAME_FIRST_ROLL_INDEX];

    if(isStrike(firstRoll)){
      let strikeFrameScore = calculateStrikeFrameScore(totalRolls)

      if(isLastFrame(totalRolls))  return strikeFrameScore;

      return  strikeFrameScore + createBowlingGame({rolls: totalRolls.slice(CURRENT_FRAME_SECOND_ROLL_INDEX)}).getFinalScore();
    }

    const secondRoll: number = totalRolls[CURRENT_FRAME_SECOND_ROLL_INDEX];

    let frameScore: number = firstRoll + secondRoll;

    if(isSpare(frameScore)){
      frameScore += totalRolls[NEXT_FRAME_FIRST_ROLL_INDEX];
      if(isLastFrame(totalRolls))  return frameScore;
    }

    return frameScore + createBowlingGame({rolls: totalRolls.slice(2)}).getFinalScore();
  }
})

const calculateStrikeFrameScore = (totalRolls: any[]) => { 
  const nextTwoRolls = totalRolls.slice(CURRENT_FRAME_SECOND_ROLL_INDEX, NEXT_FRAME_SECOND_ROLL_INDEX);
  
  const nextTwoRollsScore = nextTwoRolls.reduce((nexTwoRollsScore, rollScore) => nexTwoRollsScore + rollScore, 0);

  const strikeFrameScore =  STRIKE_ROLL_SCORE + nextTwoRollsScore;
  
  return strikeFrameScore;

}

const isSpare = (frameScore: number) => { return frameScore == 10 } 

const isStrike = (firstRollScore: number) => { return firstRollScore == 10 } 




function isLastFrame(totalRolls: any[]) {
  return totalRolls.length == 3;
}

