'use client'

import { useState, useCallback } from 'react'

const WATCHLIST_KEY = 'japan-phd-finder-watchlist'

function loadWatchlistFromStorage(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(WATCHLIST_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // ignore
  }
  return []
}

export function useWatchlist() {
  const [watchlistedIds, setWatchlistedIds] = useState<string[]>(() => {
    return loadWatchlistFromStorage()
  })

  const toggleWatchlist = useCallback((id: string) => {
    setWatchlistedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isWatchlisted = useCallback((id: string) => watchlistedIds.includes(id), [watchlistedIds])

  const watchlistedIdsParam = watchlistedIds.join(',')

  return { watchlistedIds, toggleWatchlist, isWatchlisted, watchlistedIdsParam }
}
