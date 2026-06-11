import { initLocalDatabase } from '../infrastructure/database/database'

export const initApp = async (): Promise<void> => {
  await initLocalDatabase()
}

export default initApp
