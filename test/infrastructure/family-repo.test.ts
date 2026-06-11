import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('../../src/infrastructure/database/database', () => ({ executeSql: vi.fn() }))
import { executeSql } from '../../src/infrastructure/database/database'
import { createFamily, getFamilyById, updateFamily, softDeleteFamily } from '../../src/infrastructure/repositories/familyRepository'

describe('familyRepository CRUD', () => {
  let spy: any

  beforeEach(() => {
    ;(executeSql as any).mockImplementation(async (sql: string, params?: any[]) => {
      if (sql.includes('INSERT INTO families')) return { rows: { _array: [] } }
      if (sql.includes('SELECT * FROM families WHERE id = ?')) return { rows: { _array: [{ id: params ? params[0] : 'fam1', name: 'Ma Famille', invitation_code: 'INV123', language: 'fr', settings: '{}', created_at: '2026-06-11T00:00:00.000Z' }] } }
      return { rows: { _array: [] } }
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('create / getById / update / softDelete', async () => {
    const f = { id: 'fam1', name: 'Ma Famille', settings: {} }
    await expect(createFamily(f as any)).resolves.not.toThrow()

    const loaded = await getFamilyById('fam1')
    expect(loaded).not.toBeNull()
    expect(loaded?.invitationCode).toBe('INV123')
    expect(loaded?.language).toBe('fr')

    await expect(updateFamily('fam1', { name: 'Nouvelle' })).resolves.not.toThrow()
    await expect(softDeleteFamily('fam1')).resolves.not.toThrow()
    expect((executeSql as any)).toHaveBeenCalled()
  })
})
