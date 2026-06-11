import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('../../src/infrastructure/database/database', () => ({ executeSql: vi.fn() }))
import { executeSql } from '../../src/infrastructure/database/database'
import { countRequestsByRewardAndPeriod } from '../../src/infrastructure/repositories/rewardRepository'

describe('rewardRepository counts', () => {
  beforeEach(() => {
    ;(executeSql as any).mockImplementation(async (sql: string, params?: any[]) => {
      if (sql.includes('SELECT COUNT(*) as cnt FROM reward_requests')) return { rows: { _array: [{ cnt: 2 }] } }
      return { rows: { _array: [] } }
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('countRequestsByRewardAndPeriod returns count', async () => {
    const cnt = await countRequestsByRewardAndPeriod('r1', '2026-01-01', '2026-12-31')
    expect(cnt).toBe(2)
  })
})
