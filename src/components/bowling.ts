

export const TOTAL_FRAMES = 10
export const TOTAL_PINS = 10

export type FrameEntry = {
  frameNumber: number
  rolls: number[]
}

export function isStrike(roll: number): boolean {
  return roll === TOTAL_PINS
}

export function isSpare(firstRoll: number, secondRoll: number): boolean {
  return firstRoll + secondRoll === TOTAL_PINS
}

// export type RollValue = number; // 0–10

// export type FrameType = 'strike' | 'spare' | 'open' | 'incomplete';

// export interface Frame {
//   index: number;         // 0–9
//   rolls: RollValue[];    // 1 roll for strike (frames 0–8), up to 3 for frame 9
//   score: number | null;  // null until fully calculable
//   type: FrameType;
//   isComplete: boolean;
// }

// export interface TenthFrame extends Frame {
//   index: 9;
//   rolls: RollValue[];    // 2 or 3 rolls
//   bonusEarned: boolean;  // true if strike or spare in first two balls
// }

// export interface GameState {
//   rolls: RollValue[];
//   frames: Frame[];
//   currentFrame: number;       // 0–9
//   currentRollInFrame: number; // 0, 1, or 2 (10th frame only)
//   totalScore: number;
//   isGameOver: boolean;
//   isPerfectGame: boolean;
// }

// export interface RollMeta {
//   display: string;       // 'X', '/', '-', or the number as string
//   type: 'strike' | 'spare' | 'gutter' | 'normal' | 'empty';
// }

// export interface PinState {
//   pinNumber: number;     // 1–10
//   isDown: boolean;
//   isAvailable: boolean;  // false if already knocked down this frame
// }
