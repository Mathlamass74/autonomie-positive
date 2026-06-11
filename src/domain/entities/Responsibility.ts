import { Difficulty } from './enums'

export type ResponsibilityId = string

export interface Responsibility {
  id: ResponsibilityId
  familyId: string
  title: string
  description?: string
  frequency: 'daily' | 'weekly' | 'oneoff'
  needValidation: boolean
  points?: number
  difficulty?: Difficulty
  active: boolean
  createdAt: string
}

export interface ResponsibilityOccurrence {
  id: string
  responsibilityId: ResponsibilityId
  teenId: string
  date: string
  status: 'pending' | 'submitted' | 'validated' | 'refused'
  submissionText?: string
}
