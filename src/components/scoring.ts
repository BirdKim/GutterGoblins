import { TOTAL_FRAMES, TOTAL_PINS, type FrameEntry, isStrike, isSpare } from './bowling'

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

function calculateFrameTotal(frames: FrameEntry[], frameIndex: number): number | undefined {
  const frameRolls = getRollsForFrame(frames, frameIndex)
  if (frameRolls.length === 0) {
    return undefined
  }

  const isLastFrame = frameIndex === TOTAL_FRAMES - 1

  if (isLastFrame) {
    // Wait until the frame is complete.
    const first = frameRolls[0]
    const second = frameRolls[1]

    if (first === undefined) {
      return undefined
    }

    // Strike or spare requires a third roll.
    if (
      (isStrike(first) || (second !== undefined && isSpare(first, second))) &&
      frameRolls.length < 3
    ) {
      return undefined
    }

    // Open frame requires two rolls.
    if (!isStrike(first) && frameRolls.length < 2) {
      return undefined
    }

    return frameRolls.reduce((sum, roll) => sum + roll, 0)
  }

  if (isStrike(frameRolls[0])) {
    const bonusRolls = [
      ...getRollsForFrame(frames, frameIndex + 1),
      ...getRollsForFrame(frames, frameIndex + 2),
    ]

    if (bonusRolls[0] === undefined || bonusRolls[1] === undefined) {
      return undefined
    }

    return TOTAL_PINS + bonusRolls[0] + bonusRolls[1]
  }

  if (frameRolls.length < 2) {
    return undefined
  }

  if (isSpare(frameRolls[0], frameRolls[1])) {
    const nextRoll = getRollsForFrame(frames, frameIndex + 1)[0]
    if (nextRoll === undefined) {
      return undefined
    }

    return TOTAL_PINS + nextRoll
  }

  return frameRolls[0] + frameRolls[1]
}

export function calculateFrameScores(frames: FrameEntry[]): Array<number | undefined> {
  const scores: Array<number | undefined> = Array(TOTAL_FRAMES).fill(undefined)
  let runningTotal = 0

  for (let frameIndex = 0; frameIndex < TOTAL_FRAMES; frameIndex ++) {
    const frameScore = calculateFrameTotal(frames, frameIndex)
    if (frameScore === undefined) {
      continue
    }
    
    runningTotal += frameScore
    scores[frameIndex] = runningTotal
  }

  return scores
}

export { buildFrameEntries } from './frames'
