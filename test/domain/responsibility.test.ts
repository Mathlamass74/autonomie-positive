import { describe, it, expect } from 'vitest'
import { createOccurrence, validateOccurrence, refuseOccurrence } from '../../src/domain/services/responsibilityService'

describe('responsibility service', () => {
  it('validates a responsibility occurrence and emits a trust event', () => {
    const responsibility = {
      id: 'r1',
      familyId: 'f1',
      title: 'Ranger chambre',
      frequency: 'daily',
      needValidation: true,
      active: true,
      createdAt: new Date().toISOString()
    }
    const occ = createOccurrence(responsibility as any, 't1', '2026-06-11', 'fait')
    const { occurrence, event } = validateOccurrence(occ, 'p1')
    expect(occurrence.status).toBe('validated')
    expect(event).toBeDefined()
    expect(event?.type).toBe('ResponsibilityValidated')
  })

  it('refuses without penalty (status becomes refused)', () => {
    const responsibility = {
      id: 'r2',
      familyId: 'f1',
      title: 'Faire lits',
      frequency: 'daily',
      needValidation: true,
      active: true,
      createdAt: new Date().toISOString()
    }
    const occ = createOccurrence(responsibility as any, 't1', '2026-06-11', 'pas fait')
    const { occurrence } = refuseOccurrence(occ, 'p1', 'non conforme')
    expect(occurrence.status).toBe('refused')
  })
})
