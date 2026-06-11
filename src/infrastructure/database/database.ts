import { Platform } from 'react-native'

const DB_NAME = 'autonomie-positive.db'
let _db: any = null

const ensureDb = async (): Promise<any> => {
  if (_db) return _db
  const pkg = 'expo' + '-sqlite'
  const sqlite = await import(pkg)
  const anySqlite: any = sqlite
  _db = anySqlite.openDatabase ? anySqlite.openDatabase(DB_NAME) : anySqlite.openDatabaseSync ? anySqlite.openDatabaseSync(DB_NAME) : null
  return _db
}

export const executeSql = async (sql: string, params: any[] = []): Promise<any> => {
  if (Platform && Platform.OS === 'web') {
    // On web we avoid loading expo-sqlite; return empty rows to keep the app running
    return { rows: { _array: [] } }
  }

  const db = await ensureDb()
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

export default _db
