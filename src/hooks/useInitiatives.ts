import { useEffect, useState } from 'react'
import { listInitiativesByFamily } from '../infrastructure/repositories/initiativeRepository'
import useTeen from './useTeen'

export default function useInitiatives() {
  const { teen, loading: teenLoading, error: teenError } = useTeen()
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      if (!teen) return setLoading(false)
      setLoading(true)
      try {
        const list = await listInitiativesByFamily(teen.familyId)
        if (!mounted) return
        // filter for this teen
        const filtered = list.filter((i: any) => i.teenId === teen.id)
        setItems(filtered)
        setError(null)
      } catch (e) {
        setError(e as Error)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    if (!teenLoading) load()
    return () => { mounted = false }
  }, [teen, teenLoading])

  return { items, loading: teenLoading || loading, error: teenError ?? error }
}
