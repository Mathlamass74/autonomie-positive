export type TrustEventId = string

export interface TrustEvent {
  id: TrustEventId
  familyId: string
  teenId?: string
  parentId?: string
  type: string
  sourceId?: string
  meta?: Record<string, unknown>
  createdAt: string
}
