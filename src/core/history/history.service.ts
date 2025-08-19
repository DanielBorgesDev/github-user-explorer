import { SearchHistoryEntry } from './history.types'

const KEY = 'gh_user_explorer.history'
const MAX_ITEMS = 50

function read(): SearchHistoryEntry[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const arr = JSON.parse(raw) as SearchHistoryEntry[]
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

function write(items: SearchHistoryEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(items))
}

export const HistoryService = {
  list(): SearchHistoryEntry[] {
    return read().sort((a, b) => b.at.localeCompare(a.at)) 
  },

  add(username: string): SearchHistoryEntry {
    const now = new Date().toISOString()
    const id = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`
    const items = read()


    const filtered = items.filter(e => e.username.toLowerCase() !== username.toLowerCase())
    const next = [{ id, username, at: now }, ...filtered].slice(0, MAX_ITEMS)

    write(next)
    if (!next[0]) {
      throw new Error('Failed to add history entry')
    }
    return next[0]
  },

  clear() {
    write([])
  }
}
