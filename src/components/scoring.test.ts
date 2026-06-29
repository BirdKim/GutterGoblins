import { describe, expect, it } from 'vitest'
import { buildFrameEntries, calculateFrameScores, calculateScore } from './scoring'

describe('calculateScore', () => {
  it('returns 300 for a perfect game', () => {
    const frames = buildFrameEntries(Array(12).fill(10))
    expect(calculateScore(frames)).toBe(300)
  })

  it('handles an open frame by summing the two balls', () => {
    const frames = buildFrameEntries([3, 4, 0, 0])
    expect(calculateScore(frames)).toBe(7)
  })

  it('handles a spare with the next ball as bonus', () => {
    const frames = buildFrameEntries([5, 5, 3, ...Array(18).fill(0)])
    expect(calculateScore(frames)).toBe(16)
  })

  it('handles a strike with the next two balls as bonus', () => {
    const frames = buildFrameEntries([10, 3, 4, ...Array(17).fill(0)])
    expect(calculateScore(frames)).toBe(24)
  })
})

describe('calculateFrameScores', () => {
  it('shows a spare frame score once the next roll is available', () => {
    const frames = buildFrameEntries([5, 5, 3, 0])
    const frameScores = calculateFrameScores(frames)

    expect(frameScores[0]).toBe(13)
    expect(frameScores[1]).toBe(16)
  })
})

describe('buildFrameEntries', () => {
  it('creates ten frames and preserves the rolls entered in each frame', () => {
    const frames = buildFrameEntries([10, 5, 5, 3])

    expect(frames).toHaveLength(10)
    expect(frames[0].rolls).toEqual([10])
    expect(frames[1].rolls).toEqual([5, 5])
    expect(frames[2].rolls).toEqual([3])
  })

  it('keeps the tenth frame open for bonus rolls only when required', () => {
    const rolls = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0]
    const frames = buildFrameEntries(rolls)

    expect(frames[9].rolls).toEqual([10, 0, 0])
  })
})
