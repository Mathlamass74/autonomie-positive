export type ValidationId = string

export interface Validation {
  id: ValidationId
  familyId: string
  actorParentId: string
  targetId: string // InitiativeId or ResponsibilityOccurrence id
  targetType: 'initiative' | 'responsibility'
  accepted: boolean
  comment?: string
  createdAt: string
}
