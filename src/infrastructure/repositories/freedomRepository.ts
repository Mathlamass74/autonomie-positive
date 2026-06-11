import { executeSql } from '../database/database'
import { Freedom, FreedomLevel } from '../../domain/entities/Freedom'

export const createFreedom = async (f: Freedom): Promise<void> => {
  const now = new Date().toISOString()
  await executeSql(`INSERT INTO freedoms (id, family_id, name, description, revocable, created_at) VALUES (?,?,?,?,?,?)`, [f.id, f.familyId, f.name, f.description ?? null, f.revocable ? 1 : 0, now])
}

export const createFreedomLevel = async (fl: FreedomLevel): Promise<void> => {
  await executeSql(`INSERT INTO freedom_levels (id, freedom_id, teen_id, family_id, level, start_at, end_at, active, created_at) VALUES (?,?,?,?,?,?,?,?,?)`, [fl.id, fl.freedomId, fl.teenId, fl.familyId, fl.level, fl.startAt, fl.endAt ?? null, fl.active ? 1 : 0, new Date().toISOString()])
}

export const getFreedomLevelsByTeen = async (teenId: string): Promise<FreedomLevel[]> => {
  const res = await executeSql(`SELECT * FROM freedom_levels WHERE teen_id = ? AND deleted_at IS NULL`, [teenId])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  return rows.map((r: any) => ({ id: r.id, freedomId: r.freedom_id, teenId: r.teen_id, familyId: r.family_id, level: r.level, startAt: r.start_at, endAt: r.end_at, active: !!r.active }))
}

export const softDeleteFreedomLevel = async (id: string): Promise<void> => {
  const now = new Date().toISOString()
  await executeSql(`UPDATE freedom_levels SET deleted_at = ? WHERE id = ?`, [now, id])
}
