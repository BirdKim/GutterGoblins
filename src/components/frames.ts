import { TOTAL_FRAMES, type FrameEntry, isStrike, isSpare } from './bowling'

export function buildFrameEntries(rolls: number[]): FrameEntry[] {
  const frames: FrameEntry[] = []
  let rollIndex = 0

  for (let frameNumber = 1; frameNumber <= TOTAL_FRAMES; frameNumber += 1) {
    const frameRolls: number[] = []

    if (frameNumber < TOTAL_FRAMES) {
      const firstRoll = rolls[rollIndex]
      if (firstRoll === undefined) {
        frames.push({ frameNumber, rolls: frameRolls })
        continue
      }

      frameRolls.push(firstRoll)
      rollIndex += 1

      if (isStrike(firstRoll)) {
        frames.push({ frameNumber, rolls: frameRolls })
        continue
      }

      const secondRoll = rolls[rollIndex]
      if (secondRoll === undefined) {
        frames.push({ frameNumber, rolls: frameRolls })
        continue
      }

      frameRolls.push(secondRoll)
      rollIndex += 1
      frames.push({ frameNumber, rolls: frameRolls })
      continue
    }

    const firstRoll = rolls[rollIndex]
    if (firstRoll === undefined) {
      frames.push({ frameNumber, rolls: frameRolls })
      continue
    }

    frameRolls.push(firstRoll)
    rollIndex += 1

    if (isStrike(firstRoll)) {
      const secondRoll = rolls[rollIndex]
      if (secondRoll !== undefined) {
        frameRolls.push(secondRoll)
        rollIndex += 1
      }
      const thirdRoll = rolls[rollIndex]
      if (thirdRoll !== undefined) {
        frameRolls.push(thirdRoll)
        rollIndex += 1
      }
      frames.push({ frameNumber, rolls: frameRolls })
      continue
    }

    const secondRoll = rolls[rollIndex]
    if (secondRoll === undefined) {
      frames.push({ frameNumber, rolls: frameRolls })
      continue
    }

    frameRolls.push(secondRoll)
    rollIndex += 1

    if (isSpare(firstRoll, secondRoll)) {
      const thirdRoll = rolls[rollIndex]
      if (thirdRoll !== undefined) {
        frameRolls.push(thirdRoll)
        rollIndex += 1
      }
    }

    frames.push({ frameNumber, rolls: frameRolls })
  }

  return frames
}