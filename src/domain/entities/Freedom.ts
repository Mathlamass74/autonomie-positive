export type FreedomId = string

export interface Freedom {
  id: FreedomId
  familyId: string
  name: string
  description?: string
  revocable: boolean
}

export interface FreedomLevel {
  id: string
  freedomId: FreedomId
  teenId: string
  familyId: string
  level: string // e.g. "30min", "full"
  startAt: string
  endAt?: string
  active: boolean
}
