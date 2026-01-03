import { describe, it, expect } from 'vitest';
import { sort } from './sort';

describe('sort - Package Sorting Algorithm', () => {
  describe('STANDARD packages', () => {
    it('should return STANDARD for small, light package', () => {
      expect(sort(10, 10, 10, 5)).toBe('STANDARD');
    });

    it('should return STANDARD for package just under bulky volume threshold', () => {
      expect(sort(99, 100, 100, 10)).toBe('STANDARD');
    });

    it('should return STANDARD for package just under heavy threshold', () => {
      expect(sort(50, 50, 50, 19.9)).toBe('STANDARD');
    });

    it('should return STANDARD for edge case: max non-bulky, non-heavy', () => {
      expect(sort(149, 149, 44, 19)).toBe('STANDARD');
    });
  });

  describe('SPECIAL packages - Bulky only', () => {
    it('should return SPECIAL for package with volume exactly 1,000,000', () => {
      expect(sort(100, 100, 100, 10)).toBe('SPECIAL');
    });

    it('should return SPECIAL for package with volume over 1,000,000', () => {
      expect(sort(200, 200, 200, 5)).toBe('SPECIAL');
    });

    it('should return SPECIAL for package with width >= 150', () => {
      expect(sort(150, 10, 10, 5)).toBe('SPECIAL');
    });

    it('should return SPECIAL for package with height >= 150', () => {
      expect(sort(10, 150, 10, 5)).toBe('SPECIAL');
    });

    it('should return SPECIAL for package with length >= 150', () => {
      expect(sort(10, 10, 150, 5)).toBe('SPECIAL');
    });

    it('should return SPECIAL for package with dimension exactly 150', () => {
      expect(sort(150, 1, 1, 1)).toBe('SPECIAL');
    });
  });

  describe('SPECIAL packages - Heavy only', () => {
    it('should return SPECIAL for package with mass exactly 20kg', () => {
      expect(sort(10, 10, 10, 20)).toBe('SPECIAL');
    });

    it('should return SPECIAL for package with mass over 20kg', () => {
      expect(sort(10, 10, 10, 50)).toBe('SPECIAL');
    });
  });

  describe('REJECTED packages - Both bulky and heavy', () => {
    it('should return REJECTED for large, heavy package', () => {
      expect(sort(200, 200, 200, 30)).toBe('REJECTED');
    });

    it('should return REJECTED for package with dimension >= 150 and heavy', () => {
      expect(sort(150, 10, 10, 20)).toBe('REJECTED');
    });

    it('should return REJECTED for package at exact thresholds', () => {
      expect(sort(100, 100, 100, 20)).toBe('REJECTED');
    });

    it('should return REJECTED for very large and very heavy package', () => {
      expect(sort(500, 500, 500, 100)).toBe('REJECTED');
    });
  });

  describe('Edge cases', () => {
    it('should handle zero dimensions', () => {
      expect(sort(0, 0, 0, 0)).toBe('STANDARD');
    });

    it('should handle decimal values', () => {
      expect(sort(99.5, 100.5, 100, 19.5)).toBe('STANDARD');
    });

    it('should handle large volume from small dimensions', () => {
      expect(sort(100, 100, 100, 19)).toBe('SPECIAL');
    });
  });
});
