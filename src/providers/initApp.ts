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
  // run seed if DB empty
  try {
    const { seedDatabase } = await import('../infrastructure/seeds/seedDatabase')
    await seedDatabase()
  } catch (e) {
    // ignore seeding errors to not block bootstrap
    // eslint-disable-next-line no-console
    console.warn('Seeding skipped or failed', e)
  }
}

export default initApp
