import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('../../src/infrastructure/database/database', () => ({ executeSql: vi.fn() }))
import { executeSql } from '../../src/infrastructure/database/database'
import { createTeen, getTeenById, listTeensByFamily, updateTeen, softDeleteTeen } from '../../src/infrastructure/repositories/teenRepository'

describe('teenRepository CRUD', () => {
  beforeEach(() => {
    ;(executeSql as any).mockImplementation(async (sql: string, params?: any[]) => {
      if (sql.includes('INSERT INTO teens')) return { rows: { _array: [] } }
      if (sql.includes('SELECT * FROM teens WHERE id = ?')) return { rows: { _array: [{ id: params ? params[0] : 't1', family_id: 'fam1', name: 'Alice', age: 13, active: 1 }] } }
      if (sql.includes('SELECT * FROM teens WHERE family_id = ?')) return { rows: { _array: [{ id: 't1', family_id: params ? params[0] : 'fam1', name: 'Alice', age: 13, active: 1 }] } }
      return { rows: { _array: [] } }
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('create / getById / listByTeenId / update / softDelete', async () => {
    const t = { id: 't1', familyId: 'fam1', name: 'Alice', age: 13, active: true }
    await expect(createTeen(t as any)).resolves.not.toThrow()

    const loaded = await getTeenById('t1')
    expect(loaded).not.toBeNull()
    expect(loaded?.name).toBe('Alice')

    const list = await listTeensByFamily('fam1')
    expect(list.length).toBeGreaterThan(0)

    await expect(updateTeen('t1', { name: 'Alicia' })).resolves.not.toThrow()
    await expect(softDeleteTeen('t1')).resolves.not.toThrow()
  })
})
