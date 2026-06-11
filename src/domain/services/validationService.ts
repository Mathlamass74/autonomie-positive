import { Validation } from '../entities/Validation'
import { TrustEvent } from '../entities/TrustEvent'

export const createValidation = (
  familyId: string,
  parentId: string,
  targetId: string,
  targetType: 'initiative' | 'responsibility',
  accepted: boolean,
  comment?: string
): { validation: Validation; event?: TrustEvent } => {
  const now = new Date().toISOString()
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
  if (accepted) {
    const event: TrustEvent = {
      id: `trust:val:${validation.id}`,
      familyId,
      parentId,
      type: accepted ? 'ValidationAccepted' : 'ValidationRefused',
      sourceId: targetId,
      createdAt: now
    }
    return { validation, event }
  }
  return { validation }
}
