export type TeenId = string

export interface Teen {
  id: TeenId
  familyId: string
  name: string
  age?: number
  active: boolean
}
