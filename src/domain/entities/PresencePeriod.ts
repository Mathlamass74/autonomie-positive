export type PresencePeriodId = string

export interface PresencePeriod {
  id: PresencePeriodId
  teenId: string
  familyId: string
  startAt: string
  endAt?: string
  type: 'vacation' | 'shared_custody' | 'sick' | 'other'
  note?: string
}
