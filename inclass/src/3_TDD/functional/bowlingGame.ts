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

type State = { pinsPerRoll: number[] }
const INITIAL_STATE: State = {
  pinsPerRoll: []
}

export const createBowlingGame = (state: State = INITIAL_STATE) => Object.freeze({
  roll: (pins) => roll(state, pins),
  getScore: () => getScore(state)
})

export type Game = ReturnType<typeof createBowlingGame>

const roll = (state: State, pins: number) => {
  return createBowlingGame({pinsPerRoll: [...state.pinsPerRoll, pins]})
}

const getScore = ({pinsPerRoll}: State) => {
  let score = 0
  const MAX_FRAMES = 10
  let roll = 0
  for (let frame = 0; frame < MAX_FRAMES; frame++) {
    if(isStrike(pinsPerRoll, roll)) {
      score += scoreForStrike(pinsPerRoll, roll)
      roll++
    } else if(isSpare(pinsPerRoll, roll)){
      score += scoreForSpare(pinsPerRoll, roll)
      roll += 2
    } else {
      score += scoreForFrame(pinsPerRoll, roll)
      roll += 2
    }
  }
  return score
}

function scoreForFrame(pinsPerRoll: number[], roll: number) {
  return pinsPerRoll[roll] + pinsPerRoll[roll + 1]
}

function isSpare(pinsPerRoll: number[], roll: number) {
  return pinsPerRoll[roll] + pinsPerRoll[roll + 1] === 10
}

function scoreForSpare(pinsPerRoll: number[], roll: number) {
  return 10 + pinsPerRoll[roll + 2]
}

function isStrike(pinsPerRoll: number[], roll: number) {
  return pinsPerRoll[roll] === 10
}

function scoreForStrike(pinsPerRoll: number[], roll: number) {
  return 10 + pinsPerRoll[roll + 1] + pinsPerRoll[roll + 2]
}
