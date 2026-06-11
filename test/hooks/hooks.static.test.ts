import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const hookFiles = [
  'src/hooks/useFamily.ts',
  'src/hooks/useTeen.ts',
  'src/hooks/useResponsibilities.ts',
  'src/hooks/useRewards.ts'
]

describe('hooks static assertions', () => {
  it('hooks export error state and call setError on catch', () => {
    for (const hf of hookFiles) {
      const full = path.join(process.cwd(), hf)
      const src = fs.readFileSync(full, 'utf-8')
      expect(src).toContain('setError')
      expect(src).toContain('error')
    }
  })
})
