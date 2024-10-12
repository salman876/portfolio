import { describe, expect, it } from 'vitest';

import { formatUSD } from './formatUSD';

describe(formatUSD.name, () => {
  it('should format whole numbers correctly', () => {
    expect(formatUSD(1000)).toBe('$1,000.00');
    expect(formatUSD(1)).toBe('$1.00');
  });

  it('should format decimal numbers correctly', () => {
    expect(formatUSD(1234.56)).toBe('$1,234.56');
    expect(formatUSD(0.99)).toBe('$0.99');
  });

  it('should handle zero correctly', () => {
    expect(formatUSD(0)).toBe('$0.00');
  });

  it('should handle negative numbers correctly', () => {
    expect(formatUSD(-500)).toBe('-$500.00');
    expect(formatUSD(-1234.56)).toBe('-$1,234.56');
  });
});
