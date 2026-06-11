import { PresencePeriod } from '../entities/PresencePeriod'

export const createPresencePeriod = (
  teenId: string,
  familyId: string,
  startAt: string,
  endAt?: string,
  type: 'vacation' | 'shared_custody' | 'sick' | 'other' = 'other',
  note?: string
): PresencePeriod => {
  return {
    id: `pp:${teenId}:${startAt}`,
    teenId,
    familyId,
    startAt,
    endAt,
    type,
    note
  }
}

export const isPresent = (pp?: PresencePeriod, at?: string): boolean => {
  if (!pp) return true
  const time = at ? new Date(at).getTime() : Date.now()
  const start = new Date(pp.startAt).getTime()
  const end = pp.endAt ? new Date(pp.endAt).getTime() : Infinity
  return time < start || time > end
}
