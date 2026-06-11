import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock react-native Platform as web for this test file
vi.mock('react-native', () => ({ Platform: { OS: 'web' } }))
// Mock the database module so we can assert it is NOT called
vi.mock('../../src/infrastructure/database/database', () => ({ initLocalDatabase: vi.fn() }))

import { initApp } from '../../src/providers/initApp'
import { initLocalDatabase } from '../../src/infrastructure/database/database'

describe('initApp web guard', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('does not import or call initLocalDatabase on web', async () => {
    const spyWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    await expect(initApp()).resolves.not.toThrow()
    expect(initLocalDatabase).not.toHaveBeenCalled()
    expect(spyWarn).toHaveBeenCalledWith('SQLite disabled on web preview')
    spyWarn.mockRestore()
  })
})
