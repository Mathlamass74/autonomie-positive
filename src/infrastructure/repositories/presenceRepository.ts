import { executeSql } from '../database/database'
import { PresencePeriod } from '../../domain/entities/PresencePeriod'

export const createPresence = async (p: PresencePeriod): Promise<void> => {
  await executeSql(`INSERT INTO presence_periods (id, teen_id, family_id, start_at, end_at, type, note, created_at) VALUES (?,?,?,?,?,?,?,?)`, [p.id, p.teenId, p.familyId, p.startAt, p.endAt ?? null, p.type, p.note ?? null, new Date().toISOString()])
}

export const listPresenceByTeen = async (teenId: string): Promise<PresencePeriod[]> => {
  const res = await executeSql(`SELECT * FROM presence_periods WHERE teen_id = ? AND deleted_at IS NULL`, [teenId])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  return rows.map((r: any) => ({ id: r.id, teenId: r.teen_id, familyId: r.family_id, startAt: r.start_at, endAt: r.end_at, type: r.type, note: r.note }))
}

export const softDeletePresence = async (id: string): Promise<void> => {
  const now = new Date().toISOString()
  await executeSql(`UPDATE presence_periods SET deleted_at = ? WHERE id = ?`, [now, id])
}
