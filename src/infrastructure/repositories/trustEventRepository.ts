import { executeSql } from '../database/database'
import { TrustEvent } from '../../domain/entities/TrustEvent'

export const createTrustEventRecord = async (e: TrustEvent): Promise<void> => {
  await executeSql(`INSERT INTO trust_events (id, family_id, teen_id, parent_id, type, source_id, meta, created_at) VALUES (?,?,?,?,?,?,?,?)`, [e.id, e.familyId, e.teenId ?? null, e.parentId ?? null, e.type, e.sourceId ?? null, JSON.stringify(e.meta ?? {}), e.createdAt])
}

export const listTrustEventsByFamily = async (familyId: string): Promise<TrustEvent[]> => {
  const res = await executeSql(`SELECT * FROM trust_events WHERE family_id = ? ORDER BY created_at DESC`, [familyId])
  const rows = res.rows && res.rows._array ? res.rows._array : []
  return rows.map((r: any) => ({ id: r.id, familyId: r.family_id, teenId: r.teen_id, parentId: r.parent_id, type: r.type, sourceId: r.source_id, meta: JSON.parse(r.meta || '{}'), createdAt: r.created_at }))
}
