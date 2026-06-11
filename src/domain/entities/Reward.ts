import { RewardType, RewardRarity } from './enums'

export type RewardId = string

export interface Reward {
  id: RewardId
  familyId: string
  title: string
  description?: string
  type: RewardType
  rarity?: RewardRarity
  costPoints?: number
  ceiling?: number // max times per period
  active: boolean
}

export interface RewardRequest {
  id: string
  rewardId: RewardId
  teenId: string
  familyId: string
  status: 'pending' | 'granted' | 'refused' | 'expired'
  requestedAt: string
  decidedAt?: string
  parentComment?: string
}
