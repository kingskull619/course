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
const INITIAL_STATE: State = { rolls: [] }  

export const createBowlingGame = (state: State = INITIAL_STATE) => Object.freeze({
  roll : (pins: number) => roll(state, pins),
  score: () => score(state)
})

export type Game = ReturnType<typeof createBowlingGame>

const roll = (state: State, pins:number) => {
  return createBowlingGame({ rolls: [...state.rolls, pins] })
}

const score = ({ rolls }: State) => {
  const FRAMES = 10
  let score = 0
  let firstTry = 0

  for(let frame = 0; frame < FRAMES; frame++){
    if(isStrike(rolls, firstTry)){
      score += scoreForStrike(rolls, firstTry)
      firstTry += 1
    }else if (isSpare(rolls, firstTry)){
      score += scoreForSpare(rolls, firstTry)
      firstTry += 2
    }else{
      score += scoreForFrame(rolls, firstTry)
      firstTry += 2
    }
  }
  return score
}

function scoreForStrike(rolls: number[],firstTry:number){
  return 10 + rolls[firstTry+1] + rolls[firstTry + 2]
}

function isStrike(rolls: number[], firstTry:number){
  return rolls[firstTry] == 10
}

function scoreForSpare(rolls: number[],firstTry:number){
  return 10 + rolls[firstTry + 2]
}

function isSpare(rolls: number[], firstTry:number){
  return rolls[firstTry] + rolls[firstTry + 1] == 10
}

function scoreForFrame(rolls: number[],firstTry:number){
  return rolls[firstTry] + rolls[firstTry + 1]
}