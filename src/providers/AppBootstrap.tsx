import React, { useEffect, useState, PropsWithChildren } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { initApp } from './initApp'

export default function AppBootstrap({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    initApp()
      .catch((err) => {
        if (!mounted) return
        setError(err?.message || 'Init failed')
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Initialisation de la base locale…</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={[styles.text, { color: 'red' }]}>{`Erreur d'initialisation: ${error}`}</Text>
      </View>
    )
  }

  return <>{children}</>
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  text: { marginTop: 12 }
})
