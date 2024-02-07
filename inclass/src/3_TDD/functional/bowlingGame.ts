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


type Roll = number;

type State = {
  rolls: any[];
};

const INITIAL_STATE: State = {
  rolls: [],
};

export type NewBowlingGame = ReturnType<typeof createBowlingGame>

export const createBowlingGame = (state: State = INITIAL_STATE) => Object.freeze({
  roll : (pins: Roll) => roll(state, pins),
  getScore: () => calculateScore(state),
});

const roll = (state: State, pins:Roll) => {
  return createBowlingGame({ rolls: [...state.rolls, pins] })
}

const calculateScore = ({rolls}: State)=>{
  const FRAMES = 10
  let score = 0
  let firstTry = 0;
  let frame =0;

  const NEXT_FRAME =  frame + 1
  const FISRT_TRY_FROM_FRAME = firstTry +2;
  const FISRT_TRY_FROM_FRAME_STRIKE = firstTry +1;

  for(frame = 0; frame < FRAMES; NEXT_FRAME){
    if(isStrike(rolls, firstTry)){
      score += scoreForStrike(rolls, firstTry)
      FISRT_TRY_FROM_FRAME_STRIKE
    }else if (isSpare(rolls, firstTry)){
      score += scoreForSpare(rolls, firstTry)
      FISRT_TRY_FROM_FRAME
    }else{
      score += scoreForFrame(rolls, firstTry)
      FISRT_TRY_FROM_FRAME
    }
  }
  return score
};

function scoreForStrike(rolls: number[],firstTry:number){
  return 10 + rolls[firstTry+1] + rolls[firstTry + 2]
}

function isStrike(rolls: number[], firstTry:number){
  return rolls[firstTry] === 10
}

function scoreForSpare(rolls: number[],firstTry:number){
  return 10 + rolls[firstTry + 2]
}

function isSpare(rolls: number[], firstTry:number){
  return rolls[firstTry] + rolls[firstTry + 1] === 10
}

function scoreForFrame(rolls: number[],firstTry:number){
  return rolls[firstTry] + rolls[firstTry + 1]
}

