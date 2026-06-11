import { Role } from './enums'

export type FamilyId = string

export interface Family {
  id: FamilyId
  name: string
  invitationCode?: string
  language?: string
  settings?: {
    templatesEnabled: boolean
    pointsVisible: boolean
    notificationsDigest: boolean
  }
  createdAt: string
}
