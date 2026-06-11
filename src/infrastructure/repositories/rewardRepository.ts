import { executeSql } from '../database/database'
import { Reward, RewardRequest } from '../../domain/entities/Reward'

export const createReward = async (r: Reward): Promise<void> => {
  const now = new Date().toISOString()
  await executeSql(`INSERT INTO rewards (id, family_id, title, description, type, rarity, cost_points, ceiling, active, created_at) VALUES (?,?,?,?,?,?,?,?,?,?)`, [r.id, r.familyId, r.title, r.description ?? null, r.type, r.rarity ?? null, r.costPoints ?? null, r.ceiling ?? null, r.active ? 1 : 0, now])
}

export const getRewardById = async (id: string): Promise<Reward | null> => {
  const res = await executeSql(`SELECT * FROM rewards WHERE id = ? AND deleted_at IS NULL`, [id])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  if (rows.length === 0) return null
  const r = rows[0]
  return { id: r.id, familyId: r.family_id, title: r.title, description: r.description, type: r.type, rarity: r.rarity, costPoints: r.cost_points, ceiling: r.ceiling, active: !!r.active }
}

export const listRewardsByFamily = async (familyId: string): Promise<Reward[]> => {
  const res = await executeSql(`SELECT * FROM rewards WHERE family_id = ? AND deleted_at IS NULL`, [familyId])
  const rows = res && res.rows && res.rows._array ? res.rows._array : []
  return rows.map((r: any) => ({ id: r.id, familyId: r.family_id, title: r.title, description: r.description, type: r.type, rarity: r.rarity, costPoints: r.cost_points, ceiling: r.ceiling, active: !!r.active }))
}

export const createRewardRequest = async (rr: RewardRequest): Promise<void> => {
  await executeSql(`INSERT INTO reward_requests (id, reward_id, teen_id, family_id, status, requested_at) VALUES (?,?,?,?,?,?)`, [rr.id, rr.rewardId, rr.teenId, rr.familyId, rr.status, rr.requestedAt])
}

export const getRewardRequestById = async (id: string): Promise<RewardRequest | null> => {
  const res = await executeSql(`SELECT * FROM reward_requests WHERE id = ? AND deleted_at IS NULL`, [id])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  if (rows.length === 0) return null
  const r = rows[0]
  return { id: r.id, rewardId: r.reward_id, teenId: r.teen_id, familyId: r.family_id, status: r.status, requestedAt: r.requested_at, decidedAt: r.decided_at, parentComment: r.parent_comment }
}

export const listRewardRequestsByFamily = async (familyId: string): Promise<RewardRequest[]> => {
  const res = await executeSql(`SELECT * FROM reward_requests WHERE family_id = ? AND deleted_at IS NULL`, [familyId])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  return rows.map((r: any) => ({ id: r.id, rewardId: r.reward_id, teenId: r.teen_id, familyId: r.family_id, status: r.status, requestedAt: r.requested_at, decidedAt: r.decided_at, parentComment: r.parent_comment }))
}

export const softDeleteRewardRequest = async (id: string): Promise<void> => {
  const now = new Date().toISOString()
  await executeSql(`UPDATE reward_requests SET deleted_at = ? WHERE id = ?`, [now, id])
}

export const countRequestsByRewardAndPeriod = async (rewardId: string, periodStart: string, periodEnd: string): Promise<number> => {
  const sql = `SELECT COUNT(*) as cnt FROM reward_requests WHERE reward_id = ? AND requested_at BETWEEN ? AND ? AND deleted_at IS NULL`;
  const res = await executeSql(sql, [rewardId, periodStart, periodEnd])
  const rows = res && (res as any).rows && (res as any).rows._array ? (res as any).rows._array : []
  if (rows.length === 0) return 0
  const first = rows[0] as any
  return first.cnt ?? 0
}
