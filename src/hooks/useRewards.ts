import { useEffect, useState } from 'react'
import { listRewardsByFamily } from '../infrastructure/repositories/rewardRepository'
import useFamily from './useFamily'

export default function useRewards() {
  const { family, loading: familyLoading } = useFamily()
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      if (!family) return setLoading(false)
      setLoading(true)
      try {
        const list = await listRewardsByFamily(family.id)
        if (!mounted) return
        setItems(list)
        setError(null)
      } catch (e) {
        setError(e as Error)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    if (!familyLoading) load()
    return () => { mounted = false }
  }, [family, familyLoading])

  return { items, loading, error }
}
