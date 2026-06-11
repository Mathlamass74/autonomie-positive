import { useEffect, useState } from 'react'
import { listResponsibilitiesByFamily } from '../infrastructure/repositories/responsibilityRepository'
import useFamily from './useFamily'

export default function useResponsibilities() {
  const { family, loading: familyLoading } = useFamily()
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      if (!family) return setLoading(false)
      setLoading(true)
      try {
        const list = await listResponsibilitiesByFamily(family.id)
        if (!mounted) return
        setItems(list)
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false)
      }
    }
    if (!familyLoading) load()
    return () => { mounted = false }
  }, [family, familyLoading])

  return { items, loading }
}
