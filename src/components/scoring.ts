import type { FrameEntry } from './frames'

const TOTAL_FRAMES = 10
const TOTAL_PINS = 10

export function isStrike(roll: number): boolean {
  return roll === TOTAL_PINS
}

export function isSpare(firstRoll: number, secondRoll: number): boolean {
  return firstRoll + secondRoll === TOTAL_PINS
}

function getRollsForFrame(frames: FrameEntry[], frameIndex: number): number[] {
  return frames[frameIndex]?.rolls ?? []
}

export function calculateScore(frames: FrameEntry[]): number {
  let gameScore = 0

  for (let frameIndex = 0; frameIndex < TOTAL_FRAMES; frameIndex += 1) {
    const rolls = getRollsForFrame(frames, frameIndex)
    if (rolls.length === 0) {
      break
    }

    if (frameIndex === TOTAL_FRAMES - 1) {
      gameScore += rolls.reduce((sum, roll) => sum + roll, 0)
      break
    }

    if (isStrike(rolls[0])) {
      const bonusRolls = [
        ...getRollsForFrame(frames, frameIndex + 1),
        ...getRollsForFrame(frames, frameIndex + 2),
      ]
      if (bonusRolls[0] === undefined || bonusRolls[1] === undefined) {
        break
      }
      gameScore += TOTAL_PINS + bonusRolls[0] + bonusRolls[1]
      continue
    }

    if (rolls[1] === undefined) {
      break
    }

    if (isSpare(rolls[0], rolls[1])) {
      const nextRoll = getRollsForFrame(frames, frameIndex + 1)[0]
      if (nextRoll === undefined) {
        break
      }
      gameScore += TOTAL_PINS + nextRoll
      continue
    }

    gameScore += rolls[0] + rolls[1]
  }

  return gameScore
}

export { buildFrameEntries } from './frames'
