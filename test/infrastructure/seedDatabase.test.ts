import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../src/infrastructure/repositories/familyRepository', () => ({ createFamily: vi.fn() }))
vi.mock('../../src/infrastructure/repositories/teenRepository', () => ({ createTeen: vi.fn() }))
vi.mock('../../src/infrastructure/repositories/responsibilityRepository', () => ({ createResponsibility: vi.fn() }))
vi.mock('../../src/infrastructure/repositories/rewardRepository', () => ({ createReward: vi.fn() }))

vi.mock('../../src/infrastructure/database/database', () => ({
  executeSql: vi.fn(async (sql: string, params: any[]) => {
    if (sql.includes('SELECT COUNT')) return { rows: { _array: [{ cnt: 0 }] } }
    return { rows: { _array: [] } }
  })
}))

import { seedDatabase } from '../../src/infrastructure/seeds/seedDatabase'
import * as db from '../../src/infrastructure/database/database'
import { demoParent } from '../../src/infrastructure/seeds/demoParent'

describe('seedDatabase', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('inserts parent record into parents table', async () => {
    await seedDatabase()
    // expect executeSql called with INSERT INTO parents
    const executeSql = (db as any).executeSql
    const found = executeSql.mock.calls.some((call: any) => (call[0] as string).includes('INSERT INTO parents'))
    expect(found).toBe(true)
  })
})
