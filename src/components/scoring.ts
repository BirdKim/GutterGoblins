import { TOTAL_FRAMES, TOTAL_PINS, type FrameEntry, isStrike, isSpare } from './bowling'

function getRollsForFrame(frames: FrameEntry[], frameIndex: number): number[] {
  return frames[frameIndex]?.rolls ?? []
}

export function calculateFrame(frames: FrameEntry[], frameIndex: number): number | undefined {
  const frameRolls = getRollsForFrame(frames, frameIndex)
  if (frameRolls.length === 0) {
    return undefined
  }

  const isLastFrame = frameIndex === TOTAL_FRAMES - 1

  // Handle the last frame separately.
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

  // Handle frames 1-9 on whether the first ball was a strike.
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

export function calculateCumulativeScore(frames: FrameEntry[]): Array<number | undefined> {
  const scores: Array<number | undefined> = Array(TOTAL_FRAMES).fill(undefined)
  let runningTotal = 0

  for (let frameIndex = 0; frameIndex < TOTAL_FRAMES; frameIndex ++) {
    const frameScore = calculateFrame(frames, frameIndex)
    if (frameScore === undefined) {
      continue
    }
    
    runningTotal += frameScore
    scores[frameIndex] = runningTotal
  }

  return scores
}

export function getGameTotal(frames: FrameEntry[]): number {
  const scores = calculateCumulativeScore(frames)
  for (let i = scores.length - 1; i >= 0; i--) {
    if (scores[i] !== undefined) return scores[i]!
  }
  return 0
}

// export { buildFrameEntries } from './frames'
