// Web shim for database to avoid bringing expo-sqlite (wasm) into web bundle
export const executeSql = async (_sql: string, _params: any[] = []) => {
  // keep API compatible: return empty rows
  // eslint-disable-next-line no-console
  console.warn('SQLite disabled on web preview')
  return { rows: { _array: [] } }
}

export const initLocalDatabase = async (): Promise<void> => {
  // eslint-disable-next-line no-console
  console.warn('SQLite disabled on web preview')
  return
}

export default null
