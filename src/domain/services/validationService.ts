import { Validation } from '../entities/Validation'
import { TrustEvent } from '../entities/TrustEvent'
import { createTrustEvent } from './trustEventFactory'

export const createValidation = (
  familyId: string,
  parentId: string,
  targetId: string,
  targetType: 'initiative' | 'responsibility',
  accepted: boolean,
  comment?: string
): { validation: Validation; event?: TrustEvent } => {
  const now = new Date().toISOString()
  if (!accepted && (!comment || comment.trim() === '')) {
    throw new Error('Comment required when refusing a validation')
  }

  const validation: Validation = {
    id: `val:${targetId}:${now}`,
    familyId,
    actorParentId: parentId,
    targetId,
    targetType,
    accepted,
    comment,
    createdAt: now
  }

  const eventType = accepted ? 'ValidationAccepted' : 'ValidationRefused'
  const event = createTrustEvent({
    familyId,
    teenId: undefined,
    parentId,
    type: eventType,
    sourceId: targetId,
    createdAt: now
  })

  return { validation, event }
}
