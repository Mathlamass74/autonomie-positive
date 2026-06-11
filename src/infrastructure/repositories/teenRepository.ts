import { executeSql } from '../database/database'
import { Teen } from '../../domain/entities/Teen'

export const createTeen = async (t: Teen): Promise<void> => {
  const now = new Date().toISOString()
  await executeSql(`INSERT INTO teens (id, family_id, name, age, active, created_at) VALUES (?,?,?,?,?,?)`, [t.id, t.familyId, t.name, t.age ?? null, t.active ? 1 : 0, now])
}

export const getTeenById = async (id: string): Promise<Teen | null> => {
  const res = await executeSql(`SELECT * FROM teens WHERE id = ? AND deleted_at IS NULL`, [id])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  if (rows.length === 0) return null
  const r = rows[0]
  return { id: r.id, familyId: r.family_id, name: r.name, age: r.age, active: !!r.active }
}

export const listTeensByFamily = async (familyId: string): Promise<Teen[]> => {
  const res = await executeSql(`SELECT * FROM teens WHERE family_id = ? AND deleted_at IS NULL`, [familyId])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  return rows.map((r: any) => ({ id: r.id, familyId: r.family_id, name: r.name, age: r.age, active: !!r.active }))
}

export const updateTeen = async (id: string, patch: Partial<Teen>): Promise<void> => {
  const now = new Date().toISOString()
  await executeSql(`UPDATE teens SET name = ?, age = ?, active = ?, updated_at = ? WHERE id = ?`, [patch.name ?? null, patch.age ?? null, patch.active ? 1 : 0, now, id])
}

export const softDeleteTeen = async (id: string): Promise<void> => {
  const now = new Date().toISOString()
  await executeSql(`UPDATE teens SET deleted_at = ? WHERE id = ?`, [now, id])
}
