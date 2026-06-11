import { executeSql } from '../database/database'
import { Initiative } from '../../domain/entities/Initiative'

export const createInitiativeRecord = async (i: Initiative): Promise<void> => {
  const now = i.createdAt ?? new Date().toISOString()
  await executeSql(`INSERT INTO initiatives (id, family_id, teen_id, title, description, status, parent_comment, created_at) VALUES (?,?,?,?,?,?,?,?)`, [i.id, i.familyId, i.teenId, i.title, i.description, i.status, i.parentComment ?? null, now])
}

export const getInitiativeById = async (id: string): Promise<Initiative | null> => {
  const res = await executeSql(`SELECT * FROM initiatives WHERE id = ? AND deleted_at IS NULL`, [id])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  if (rows.length === 0) return null
  const r = rows[0]
  return { id: r.id, familyId: r.family_id, teenId: r.teen_id, title: r.title, description: r.description, status: r.status, parentComment: r.parent_comment, createdAt: r.created_at }
}

export const listInitiativesByFamily = async (familyId: string) => {
  const res = await executeSql(`SELECT * FROM initiatives WHERE family_id = ? AND deleted_at IS NULL`, [familyId])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  return rows.map((r: any) => ({ id: r.id, familyId: r.family_id, teenId: r.teen_id, title: r.title, description: r.description, status: r.status, parentComment: r.parent_comment, createdAt: r.created_at }))
}

export const updateInitiative = async (id: string, patch: Partial<Initiative>) => {
  const now = new Date().toISOString()
  await executeSql(`UPDATE initiatives SET status = ?, parent_comment = ?, updated_at = ? WHERE id = ?`, [patch.status ?? null, patch.parentComment ?? null, now, id])
}

export const softDeleteInitiative = async (id: string) => {
  const now = new Date().toISOString()
  await executeSql(`UPDATE initiatives SET deleted_at = ? WHERE id = ?`, [now, id])
}
