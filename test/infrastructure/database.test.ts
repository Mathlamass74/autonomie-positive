import { describe, it, expect, vi, beforeEach } from 'vitest'

// mock expo-sqlite openDatabase
vi.mock('expo-sqlite', () => ({
  openDatabase: () => ({
    transaction: (cb: any) => {
      const tx = {
        executeSql: (_sql: string, _params: any[], success?: any, _err?: any) => {
          const fakeResult = { rows: { _array: [] } }
          if (success) success(tx, fakeResult)
        }
      }
      cb(tx)
    }
  })
}))

import { initLocalDatabase } from '../../src/infrastructure/database/database'

describe('database migrations', () => {
  it('runs without throwing', async () => {
    await expect(initLocalDatabase()).resolves.not.toThrow()
  })
})
