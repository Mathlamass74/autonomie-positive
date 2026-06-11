import { executeSql } from '../database/database'
import { demoFamily } from './demoFamily'
import { demoParent } from './demoParent'
import { demoTeen } from './demoTeen'
import { demoResponsibilities } from './demoResponsibilities'
import { demoRewards } from './demoRewards'
import { createFamily } from '../repositories/familyRepository'
import { createTeen } from '../repositories/teenRepository'
import { createResponsibility } from '../repositories/responsibilityRepository'
import { createReward } from '../repositories/rewardRepository'

export const isDbEmpty = async (): Promise<boolean> => {
  const res = await executeSql(`SELECT COUNT(*) as cnt FROM families WHERE deleted_at IS NULL`, [])
  const rows = res && (res as any).rows && (res as any).rows._array ? (res as any).rows._array : []
  const cnt = rows.length ? rows[0].cnt ?? 0 : 0
  return cnt === 0
}

export const seedDatabase = async (): Promise<void> => {
  const empty = await isDbEmpty()
  if (!empty) return

  // create family
  await createFamily({ id: demoFamily.id, name: demoFamily.name, settings: demoFamily.settings, createdAt: new Date().toISOString() } as any)

  // create teen and parent
  await createTeen({ id: demoTeen.id, familyId: demoTeen.familyId, name: demoTeen.name, age: demoTeen.age, active: demoTeen.active } as any)
  // create parent record
  await executeSql(`INSERT INTO parents (id, family_id, name, role, created_at) VALUES (?,?,?,?,?)`, [demoParent.id, demoParent.familyId, demoParent.name, demoParent.role, new Date().toISOString()])

  // responsibilities
  for (const r of demoResponsibilities) {
    await createResponsibility({ id: r.id, familyId: r.familyId, title: r.title, description: r.description, frequency: r.frequency, needValidation: !!r.needValidation, points: r.points, difficulty: null, active: !!r.active } as any)
  }

  // rewards
  for (const rw of demoRewards) {
    await createReward({ id: rw.id, familyId: rw.familyId, title: rw.title, description: rw.description, type: rw.type, rarity: rw.rarity, costPoints: rw.costPoints, ceiling: rw.ceiling, active: !!rw.active } as any)
  }
}

export default seedDatabase
