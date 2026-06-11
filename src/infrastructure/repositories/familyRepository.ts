import { executeSql } from '../database/database'
import { Family } from '../../domain/entities/Family'

export const createFamily = async (f: Family): Promise<void> => {
  const now = f.createdAt ?? new Date().toISOString()
  const sql = `INSERT INTO families (id, name, settings, created_at) VALUES (?,?,?,?)`
  await executeSql(sql, [f.id, f.name, JSON.stringify(f.settings || {}), now])
}

export const getFamilyById = async (id: string): Promise<Family | null> => {
  const res = await executeSql(`SELECT * FROM families WHERE id = ? AND deleted_at IS NULL`, [id])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  if (rows.length === 0) return null
  const r = rows[0]
  return { id: r.id, name: r.name, invitationCode: r.invitation_code, language: r.language, settings: JSON.parse(r.settings || '{}'), createdAt: r.created_at }
}

export const listFamilies = async (): Promise<Family[]> => {
  const res = await executeSql(`SELECT * FROM families WHERE deleted_at IS NULL`, [])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  return rows.map((r: any) => ({ id: r.id, name: r.name, invitationCode: r.invitation_code, language: r.language, settings: JSON.parse(r.settings || '{}'), createdAt: r.created_at }))
}

export const updateFamily = async (id: string, patch: Partial<Family>): Promise<void> => {
  const now = new Date().toISOString()
  const sql = `UPDATE families SET name = ?, settings = ?, updated_at = ? WHERE id = ?`
  await executeSql(sql, [patch.name ?? null, JSON.stringify(patch.settings ?? {}), now, id])
}

export const softDeleteFamily = async (id: string): Promise<void> => {
  const now = new Date().toISOString()
  await executeSql(`UPDATE families SET deleted_at = ? WHERE id = ?`, [now, id])
}
