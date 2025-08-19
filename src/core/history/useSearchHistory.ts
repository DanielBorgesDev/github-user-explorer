import { useCallback, useEffect, useState } from 'react'
import { HistoryService } from './history.service'
import type { SearchHistoryEntry } from './history.types'

export function useSearchHistory() {
  const [items, setItems] = useState<SearchHistoryEntry[]>([])

  const refresh = useCallback(() => {
    setItems(HistoryService.list())
  }, [])

  const add = useCallback((username: string) => {
    HistoryService.add(username)
    refresh()
  }, [refresh])

  const clear = useCallback(() => {
    HistoryService.clear()
    refresh()
  }, [refresh])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { items, add, clear, refresh }
}
