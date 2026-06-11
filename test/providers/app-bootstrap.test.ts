import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('../../src/infrastructure/database/database', () => ({ initLocalDatabase: vi.fn() }))
import { initLocalDatabase } from '../../src/infrastructure/database/database'
import { initApp } from '../../src/providers/initApp'

describe('AppBootstrap init', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('calls initLocalDatabase successfully', async () => {
    ;(initLocalDatabase as any).mockResolvedValue(undefined)
    await expect(initApp()).resolves.not.toThrow()
    expect(initLocalDatabase).toHaveBeenCalled()
  })

  it('propagates error when init fails', async () => {
    ;(initLocalDatabase as any).mockRejectedValue(new Error('boom'))
    await expect(initApp()).rejects.toThrow('boom')
  })
})
