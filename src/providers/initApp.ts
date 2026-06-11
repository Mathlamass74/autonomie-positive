import { Platform } from 'react-native'

export const initApp = async (): Promise<void> => {
  if (Platform && Platform.OS === 'web') {
    // avoid importing expo-sqlite on web — treat as successful init
    // eslint-disable-next-line no-console
    console.warn('SQLite disabled on web preview')
    return
  }

  const { initLocalDatabase } = await import('../infrastructure/database/database')
  await initLocalDatabase()
}

export default initApp
