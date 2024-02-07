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
 * to change the state var... just be carefull...⚠️
 */

type State = { rolls: number[] }
const INITIAL_STATE: State = {rolls: []}
const FRAMES: number = 10;

export const createBowlingGame = (state: State = INITIAL_STATE) => Object.freeze({
  roll: (pins: number) => roll(state, pins),
  getScore: () => getScore(state),
  resetState: () => resetState()
  //myOhterFunction: (...) => myOtherFunction(...)
})

const roll = (state: State, pins: number) =>{
  const rolls = [...state.rolls, pins]
  return createBowlingGame({rolls})
}

const getScore = ({rolls}:State) =>{
  let score = 0;
  let firstTry = 0;

  for(let frame = 0; frame < FRAMES; frame++){
    if(isStrike(rolls, firstTry)){
      score += scoreForStrike(rolls, firstTry);
      firstTry++;
    }else if(isSpare(rolls, firstTry)){
      score += scoreForSpare(rolls, firstTry);
      firstTry+=2;
    }else{
      score += rolls[firstTry] + rolls[firstTry + 1];
      firstTry+=2;
    }
  }

  return score;
}

const resetState = () => createBowlingGame();

const isSpare = (rolls: number[], firstTry: number) =>{
  return rolls[firstTry] + rolls[firstTry + 1] === 10;
}

const isStrike = (rolls: number[], firstTry: number) =>{
  return rolls[firstTry] === 10;
}

function scoreForSpare(rolls: number[], firstTry: number) {
  return 10 + rolls[firstTry + 2];
}

function scoreForStrike(rolls: number[], firstTry: number) {
  return 10 + rolls[firstTry + 1] + rolls[firstTry + 2];
}

