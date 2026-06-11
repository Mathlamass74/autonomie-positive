import { executeSql } from '../database/database'
import { Responsibility, ResponsibilityOccurrence } from '../../domain/entities/Responsibility'

export const createResponsibility = async (r: Responsibility): Promise<void> => {
  const now = r.createdAt ?? new Date().toISOString()
  await executeSql(`INSERT INTO responsibilities (id, family_id, title, description, frequency, need_validation, points, difficulty, active, created_at) VALUES (?,?,?,?,?,?,?,?,?,?)`, [r.id, r.familyId, r.title, r.description ?? null, r.frequency, r.needValidation ? 1 : 0, r.points ?? null, r.difficulty ?? null, r.active ? 1 : 0, now])
}

export const getResponsibilityById = async (id: string): Promise<Responsibility | null> => {
  const res = await executeSql(`SELECT * FROM responsibilities WHERE id = ? AND deleted_at IS NULL`, [id])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  if (rows.length === 0) return null
  const r = rows[0]
  return { id: r.id, familyId: r.family_id, title: r.title, description: r.description, frequency: r.frequency, needValidation: !!r.need_validation, points: r.points, difficulty: r.difficulty, active: !!r.active, createdAt: r.created_at }
}

export const listResponsibilitiesByFamily = async (familyId: string): Promise<Responsibility[]> => {
  const res = await executeSql(`SELECT * FROM responsibilities WHERE family_id = ? AND deleted_at IS NULL`, [familyId])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  return rows.map((r: any) => ({ id: r.id, familyId: r.family_id, title: r.title, description: r.description, frequency: r.frequency, needValidation: !!r.need_validation, points: r.points, difficulty: r.difficulty, active: !!r.active, createdAt: r.created_at }))
}

export const createOccurrence = async (o: ResponsibilityOccurrence): Promise<void> => {
  const now = new Date().toISOString()
  await executeSql(`INSERT INTO responsibility_occurrences (id, responsibility_id, teen_id, date, status, submission_text, created_at) VALUES (?,?,?,?,?,?,?)`, [o.id, o.responsibilityId, o.teenId, o.date, o.status, o.submissionText ?? null, now])
}

export const getOccurrenceById = async (id: string): Promise<ResponsibilityOccurrence | null> => {
  const res = await executeSql(`SELECT * FROM responsibility_occurrences WHERE id = ? AND deleted_at IS NULL`, [id])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  if (rows.length === 0) return null
  const r = rows[0]
  return { id: r.id, responsibilityId: r.responsibility_id, teenId: r.teen_id, date: r.date, status: r.status, submissionText: r.submission_text }
}

export const updateOccurrence = async (id: string, patch: Partial<ResponsibilityOccurrence>): Promise<void> => {
  const now = new Date().toISOString()
  await executeSql(`UPDATE responsibility_occurrences SET status = ?, submission_text = ?, updated_at = ? WHERE id = ?`, [patch.status ?? null, patch.submissionText ?? null, now, id])
}

export const softDeleteOccurrence = async (id: string): Promise<void> => {
  const now = new Date().toISOString()
  await executeSql(`UPDATE responsibility_occurrences SET deleted_at = ? WHERE id = ?`, [now, id])
}
