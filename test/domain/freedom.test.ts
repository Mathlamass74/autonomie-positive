import { describe, it, expect } from 'vitest'
import { grantFreedom, revokeFreedom } from '../../src/domain/services/freedomService'

describe('freedom service', () => {
  it('grants and revokes a freedom level', () => {
    const freedom = { id: 'fdom1', familyId: 'f1', name: 'Extra screen', revocable: true }
    const res = grantFreedom(freedom as any, 't1', 'f1', '30min', 1000)
    expect(res.freedomLevel.active).toBe(true)
    const revoked = revokeFreedom(res.freedomLevel)
    expect(revoked.active).toBe(false)
  })
})
