
type State = { rolls: number[] }
const INITIAL_STATE: State = {
  rolls: []
}

export const createBowlingGame = (state: State = INITIAL_STATE) => Object.freeze({
  rollBall: (pins: number) => rollBall(pins, state),
  getFinalScore: () => getFinalScore(state),
  resetState: () => resetState()
})

const rollBall = (pins: number, state: State) => {
  return createBowlingGame({ rolls: [...state.rolls, pins] })
}

const getFinalScore = ({ rolls }: State) => {
  let total = 0
  let throwNumber = 0
  let FRAMES = 10

  let extra = 0
  let throws = 2

  for (let frame = 0; frame < FRAMES; frame++) {
    extra = 0
    throws = 2

    if (isStrike(rolls, throwNumber)) {
      extra = getStrikeScoreExtra(rolls, throwNumber)
      throws = 1
    } else if (isSpare(rolls, throwNumber)) {
      extra = getSpareScoreExtra(rolls, throwNumber)
    }
    total += getFrameScore(rolls, throwNumber) + extra
    throwNumber += throws
  }
  return total
}

const isStrike = (roll: number[], currentThrow: number) => {
  return roll.at(currentThrow) === 10
}

const getStrikeScoreExtra = (roll: number[], currentThrow: number) => {
  return getSpareScoreExtra(roll, currentThrow)
}

const isSpare = (roll: number[], currentThrow: number) => {
  return roll.at(currentThrow) + roll.at(currentThrow + 1) === 10
}

const getSpareScoreExtra = (roll: number[], currentThrow: number) => {
  return roll.at(currentThrow + 2)
}

const getFrameScore = (roll: number[], currentThrow: number) => {
  return roll.at(currentThrow) + roll.at(currentThrow + 1)
}

const resetState = () => {
  return createBowlingGame({ rolls: [] })
}
