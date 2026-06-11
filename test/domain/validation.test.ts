import { describe, it, expect } from 'vitest'
import { createValidation } from '../../src/domain/services/validationService'

describe('validation service', () => {
  it('creates validation accepted and emits TrustEvent with required fields', () => {
    const { validation, event } = createValidation('f1', 'p1', 'target1', 'responsibility', true)
    expect(validation.accepted).toBe(true)
    expect(event).toBeDefined()
    expect(event?.familyId).toBe('f1')
    expect(event?.sourceId).toBe('target1')
    expect(event?.createdAt).toBeDefined()
    expect(event?.type).toBe('ValidationAccepted')
  })

  it('creates validation refused when comment provided and emits ValidationRefused', () => {
    const { validation, event } = createValidation('f1', 'p1', 'target2', 'initiative', false, 'not ok')
    expect(validation.accepted).toBe(false)
    expect(event).toBeDefined()
    expect(event?.type).toBe('ValidationRefused')
    expect(event?.familyId).toBe('f1')
    expect(event?.sourceId).toBe('target2')
  })

  it('throws when refusing without comment', () => {
    expect(() => createValidation('f1', 'p1', 't3', 'responsibility', false)).toThrow()
  })
})
