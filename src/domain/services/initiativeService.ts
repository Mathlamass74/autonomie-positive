import { Initiative, InitiativeId } from '../entities/Initiative'
import { InitiativeStatus } from '../entities/enums'
import { TrustEvent } from '../entities/TrustEvent'

export const createInitiative = (
  familyId: string,
  teenId: string,
  title: string,
  description: string
): Initiative => {
  const now = new Date().toISOString()
  return {
    id: `init:${teenId}:${now}`,
    familyId,
    teenId,
    title,
    description,
    status: InitiativeStatus.Pending,
    createdAt: now
  }
}

export const validateInitiative = (
  initiative: Initiative,
  parentId: string
): { initiative: Initiative; event: TrustEvent } => {
  const now = new Date().toISOString()
  const updated: Initiative = { ...initiative, status: InitiativeStatus.Validated }
  const event: TrustEvent = {
    id: `trust:init:${initiative.id}:${now}`,
    familyId: initiative.familyId,
    teenId: initiative.teenId,
    parentId,
    type: 'InitiativeValidated',
    sourceId: initiative.id,
    createdAt: now
  }
  return { initiative: updated, event }
}

export const refuseInitiative = (
  initiative: Initiative,
  parentId: string,
  comment?: string
): Initiative => {
  return { ...initiative, status: InitiativeStatus.Refused, parentComment: comment }
}
