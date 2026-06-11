import { useEffect, useState } from 'react'
import { listTeensByFamily } from '../infrastructure/repositories/teenRepository'
import { Teen } from '../domain/entities/Teen'
import useFamily from './useFamily'

export default function useTeen() {
  const { family, loading: familyLoading } = useFamily()
  const [teen, setTeen] = useState<Teen | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      if (!family) return setLoading(false)
      setLoading(true)
      try {
        const list = await listTeensByFamily(family.id)
        if (!mounted) return
        setTeen(list.length ? list[0] : null)
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false)
      }
    }
    if (!familyLoading) load()
    return () => { mounted = false }
  }, [family, familyLoading])

  return { teen, loading: familyLoading || loading }
}
