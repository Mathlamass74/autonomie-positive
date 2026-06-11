import { useEffect, useState } from 'react'
import { listFamilies } from '../infrastructure/repositories/familyRepository'
import { Family } from '../domain/entities/Family'

export default function useFamily() {
  const [family, setFamily] = useState<Family | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      try {
        const list = await listFamilies()
        if (!mounted) return
        setFamily(list.length ? list[0] : null)
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  return { family, loading, refresh: async () => { setLoading(true); const list = await listFamilies(); setFamily(list.length ? list[0] : null); setLoading(false) } }
}
