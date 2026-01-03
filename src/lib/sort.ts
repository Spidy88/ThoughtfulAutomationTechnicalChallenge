/**
 * Package Sorting Algorithm for Robotic Automation
 * 
 * Rules:
 * - BULKY: volume >= 1,000,000 cm³ OR any dimension >= 150 cm
 * - HEAVY: mass >= 20 kg
 * 
 * Stacks:
 * - STANDARD: not bulky AND not heavy
 * - SPECIAL: bulky OR heavy (but not both)
 * - REJECTED: bulky AND heavy
 */

export type Stack = 'STANDARD' | 'SPECIAL' | 'REJECTED';

export function sort(width: number, height: number, length: number, mass: number): Stack {
  const volume = width * height * length;
  
  const isBulky = volume >= 1_000_000 || width >= 150 || height >= 150 || length >= 150;
  const isHeavy = mass >= 20;
  
  if (isBulky && isHeavy) {
    return 'REJECTED';
  }
  
  if (isBulky || isHeavy) {
    return 'SPECIAL';
  }
  
  return 'STANDARD';
}

// Export the source code as a string for display
export const sortSourceCode = `export type Stack = 'STANDARD' | 'SPECIAL' | 'REJECTED';

export function sort(width: number, height: number, length: number, mass: number): Stack {
  const volume = width * height * length;
  
  const isBulky = volume >= 1_000_000 || width >= 150 || height >= 150 || length >= 150;
  const isHeavy = mass >= 20;
  
  if (isBulky && isHeavy) {
    return 'REJECTED';
  }
  
  if (isBulky || isHeavy) {
    return 'SPECIAL';
  }
  
  return 'STANDARD';
}`;
