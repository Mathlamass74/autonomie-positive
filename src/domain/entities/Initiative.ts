import { InitiativeStatus } from './enums'

export type InitiativeId = string

export interface Initiative {
  id: InitiativeId
  familyId: string
  teenId: string
  title: string
  description: string
  status: InitiativeStatus
  createdAt: string
  parentComment?: string
}
