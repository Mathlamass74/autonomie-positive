import { Freedom, FreedomLevel } from '../entities/Freedom'
import { TrustEvent } from '../entities/TrustEvent'

export const grantFreedom = (
  freedom: Freedom,
  teenId: string,
  familyId: string,
  level: string,
  durationMs?: number
): { freedomLevel: FreedomLevel; event: TrustEvent } => {
  const now = Date.now()
  const startAt = new Date(now).toISOString()
  const endAt = durationMs ? new Date(now + durationMs).toISOString() : undefined
  const fl: FreedomLevel = {
    id: `fl:${freedom.id}:${teenId}:${startAt}`,
    freedomId: freedom.id,
    teenId,
    familyId,
    level,
    startAt,
    endAt,
    active: true
  }
  const event: TrustEvent = {
    id: `trust:freedom:${fl.id}`,
    familyId,
    teenId,
    type: 'FreedomGranted',
    sourceId: freedom.id,
    createdAt: startAt
  }
  return { freedomLevel: fl, event }
}

export const revokeFreedom = (fl: FreedomLevel): FreedomLevel => ({ ...fl, active: false })
