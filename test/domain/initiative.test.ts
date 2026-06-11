import { describe, it, expect } from 'vitest'
import { createInitiative, validateInitiative, refuseInitiative } from '../../src/domain/services/initiativeService'

describe('initiative service', () => {
  it('creates and validates an initiative producing a TrustEvent', () => {
    const init = createInitiative('f1', 't1', 'Aider voisin', 'Je veux aider')
    expect(init.status).toBe('pending')
    const { initiative, event } = validateInitiative(init, 'p1')
    expect(initiative.status).toBe('validated')
    expect(event.type).toBe('InitiativeValidated')
  })

  it('refuses an initiative and attaches a comment', () => {
    const init = createInitiative('f1', 't1', 'Faire bruit', 'Excuse')
    const refused = refuseInitiative(init, 'p1', 'Non approprié')
    expect(refused.status).toBe('refused')
    expect(refused.parentComment).toBe('Non approprié')
  })
})
