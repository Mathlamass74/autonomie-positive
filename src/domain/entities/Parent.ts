import { Role } from './enums'

export type ParentId = string

export interface Parent {
  id: ParentId
  familyId: string
  name: string
  role: Role
  preferences?: {
    notificationsDigest?: boolean
    templatesEnabled?: boolean
  }
  active: boolean
}
