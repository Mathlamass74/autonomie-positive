import { Responsibility, ResponsibilityOccurrence, ResponsibilityId } from '../entities/Responsibility'
import { TrustEvent } from '../entities/TrustEvent'
import { createTrustEvent } from './trustEventFactory'

export const createOccurrence = (
  responsibility: Responsibility,
  teenId: string,
  date: string,
  submissionText?: string
): ResponsibilityOccurrence => {
  return {
    id: `${responsibility.id}:${teenId}:${date}`,
    responsibilityId: responsibility.id,
    teenId,
    date,
    status: responsibility.needValidation ? 'submitted' : 'validated',
    submissionText
  }
}

export const validateOccurrence = (
  occurrence: ResponsibilityOccurrence,
  parentId: string,
  responsibility: Responsibility
): { occurrence: ResponsibilityOccurrence; event?: TrustEvent } => {
  const now = new Date().toISOString()
  const updated: ResponsibilityOccurrence = { ...occurrence, status: 'validated' }
  const event = createTrustEvent({
    familyId: responsibility.familyId,
    teenId: updated.teenId,
    parentId,
    type: 'ResponsibilityValidated',
    sourceId: updated.id,
    createdAt: now
  })
  return { occurrence: updated, event }
}

export const refuseOccurrence = (
  occurrence: ResponsibilityOccurrence,
  parentId: string,
  comment?: string
): { occurrence: ResponsibilityOccurrence } => {
  const updated: ResponsibilityOccurrence = { ...occurrence, status: 'refused' }
  return { occurrence: updated }
}
