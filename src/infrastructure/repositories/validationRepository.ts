import { executeSql } from '../database/database'
import { Validation } from '../../domain/entities/Validation'

export const createValidationRecord = async (v: Validation): Promise<void> => {
  await executeSql(`INSERT INTO validations (id, family_id, actor_parent_id, target_id, target_type, accepted, comment, created_at) VALUES (?,?,?,?,?,?,?,?)`, [v.id, v.familyId, v.actorParentId, v.targetId, v.targetType, v.accepted ? 1 : 0, v.comment ?? null, v.createdAt])
}

export const getValidationById = async (id: string): Promise<Validation | null> => {
  const res = await executeSql(`SELECT * FROM validations WHERE id = ? AND deleted_at IS NULL`, [id])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  if (rows.length === 0) return null
  const r = rows[0]
  return { id: r.id, familyId: r.family_id, actorParentId: r.actor_parent_id, targetId: r.target_id, targetType: r.target_type, accepted: !!r.accepted, comment: r.comment, createdAt: r.created_at }
}

export const listValidationsByFamily = async (familyId: string): Promise<Validation[]> => {
  const res = await executeSql(`SELECT * FROM validations WHERE family_id = ? AND deleted_at IS NULL`, [familyId])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  return rows.map((r: any) => ({ id: r.id, familyId: r.family_id, actorParentId: r.actor_parent_id, targetId: r.target_id, targetType: r.target_type, accepted: !!r.accepted, comment: r.comment, createdAt: r.created_at }))
}

export const softDeleteValidation = async (id: string): Promise<void> => {
  const now = new Date().toISOString()
  await executeSql(`UPDATE validations SET deleted_at = ? WHERE id = ?`, [now, id])
}
