import * as SQLite from 'expo-sqlite'

const DB_NAME = 'autonomie-positive.db'
// types in expo-sqlite typings vary; cast to any for runtime call
const db: any = (SQLite as any).openDatabase ? (SQLite as any).openDatabase(DB_NAME) : (SQLite as any).openDatabaseSync ? (SQLite as any).openDatabaseSync(DB_NAME) : null

export const executeSql = (sql: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('No database available'))
    db.transaction((tx: any) => {
      tx.executeSql(
        sql,
        params,
        (_tx: any, result: any) => resolve(result),
        (_tx: any, err: any) => {
          reject(err)
          return false
        }
      )
    }, (err: any) => reject(err))
  })
}

export const initLocalDatabase = async (): Promise<void> => {
  const { runMigrations } = await import('./migrations')
  await runMigrations()
}

export default db
