import { executeSql } from './database'
import { CREATE_TABLES_SQL } from './schema'

export const runMigrations = async (): Promise<void> => {
  for (const sql of CREATE_TABLES_SQL) {
    await executeSql(sql)
  }
}
