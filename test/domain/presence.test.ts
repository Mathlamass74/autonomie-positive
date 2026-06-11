import { describe, it, expect } from 'vitest'
import { createPresencePeriod, isPresent } from '../../src/domain/services/presenceService'

describe('presence service', () => {
  it('creates presence period and respects absence', () => {
    const start = '2026-06-01T00:00:00.000Z'
    const end = '2026-06-10T00:00:00.000Z'
    const pp = createPresencePeriod('t1', 'f1', start, end, 'vacation')
    expect(pp.teenId).toBe('t1')
    // check presence on a date inside period -> isPresent returns false (absent)
    const present = isPresent(pp, '2026-06-05T00:00:00.000Z')
    expect(present).toBe(false)
    // check outside period
    const present2 = isPresent(pp, '2026-06-15T00:00:00.000Z')
    expect(present2).toBe(true)
  })
})
