import { Reward, RewardRequest } from '../entities/Reward'
import { TrustEvent } from '../entities/TrustEvent'

export const requestReward = (
  reward: Reward,
  teenId: string,
  familyId: string
): RewardRequest => {
  const now = new Date().toISOString()
  return {
    id: `rr:${reward.id}:${teenId}:${now}`,
    rewardId: reward.id,
    teenId,
    familyId,
    status: 'pending',
    requestedAt: now
  }
}

export const canGrantReward = (
  reward: Reward,
  requestedCountInPeriod: number
): boolean => {
  if (reward.ceiling === undefined) return true
  return requestedCountInPeriod < reward.ceiling
}

export const grantReward = (
  request: RewardRequest,
  parentId: string
): { request: RewardRequest; event: TrustEvent } => {
  const now = new Date().toISOString()
  const updated: RewardRequest = { ...request, status: 'granted', decidedAt: now }
  const event: TrustEvent = {
    id: `trust:reward:${updated.id}`,
    familyId: updated.familyId,
    teenId: updated.teenId,
    parentId,
    type: 'RewardGranted',
    sourceId: updated.rewardId,
    createdAt: now
  }
  return { request: updated, event }
}

export const refuseReward = (
  request: RewardRequest,
  parentId: string,
  comment?: string
): RewardRequest => {
  return { ...request, status: 'refused', decidedAt: new Date().toISOString(), parentComment: comment }
}
