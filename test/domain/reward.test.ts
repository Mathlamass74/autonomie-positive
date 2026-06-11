import { describe, it, expect } from 'vitest'
import { requestReward, canGrantReward, grantReward, refuseReward } from '../../src/domain/services/rewardService'

describe('reward service', () => {
  it('creates a reward request and grants when ceiling allows', () => {
    const reward = { id: 'rw1', familyId: 'f1', title: 'Soirée film', type: 'activity', active: true }
    const req = requestReward(reward as any, 't1', 'f1')
    expect(req.status).toBe('pending')
    const allowed = canGrantReward(reward as any, 0)
    expect(allowed).toBe(true)
    const { request, event } = grantReward(req, 'p1')
    expect(request.status).toBe('granted')
    expect(event.type).toBe('RewardGranted')
  })

  it('blocks grant when ceiling reached', () => {
    const reward = { id: 'rw2', familyId: 'f1', title: 'Snack', type: 'material', ceiling: 1, active: true }
    const allowed = canGrantReward(reward as any, 1)
    expect(allowed).toBe(false)
  })

  it('refuses a reward request with comment', () => {
    const reward = { id: 'rw3', familyId: 'f1', title: 'Toy', type: 'material', active: true }
    const req = requestReward(reward as any, 't1', 'f1')
    const r = refuseReward(req, 'p1', 'Trop cher')
    expect(r.status).toBe('refused')
    expect(r.parentComment).toBe('Trop cher')
  })
})
