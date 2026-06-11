import { TrustEvent } from '../entities/TrustEvent'

export const createTrustEvent = (opts: {
  familyId: string
  teenId?: string
  parentId?: string
  type: string
  sourceId?: string
  createdAt?: string
}): TrustEvent => {
  const createdAt = opts.createdAt ?? new Date().toISOString()
  const id = `trust:${opts.type}:${opts.sourceId ?? 'unknown'}:${createdAt}`
  return {
    id,
    familyId: opts.familyId,
    teenId: opts.teenId,
    parentId: opts.parentId,
    type: opts.type,
    sourceId: opts.sourceId,
    createdAt
  }
}
