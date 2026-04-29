import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('joins class names', () => {
    const out = cn('foo', 'bar');
    expect(out).toEqual(expect.stringContaining('foo'));
    expect(out).toEqual(expect.stringContaining('bar'));
  });
});
