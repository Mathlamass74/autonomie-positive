import { useEffect, useState } from 'react'
import { listValidationsByFamily } from '../infrastructure/repositories/validationRepository'
import useFamily from './useFamily'

export default function useValidations() {
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
        const list = await listValidationsByFamily(family.id)
        if (!mounted) return
        // keep only pending submissions (accepted === false)
        const pending = list.filter((v: any) => !v.accepted)
        setItems(pending)
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

  return { items, loading: familyLoading || loading, error }
}
