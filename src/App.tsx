import React, { useState } from 'react'



export function App() {
  const [input, setInput] = useState('octocat')
  const [user, setUser] = useState<GithubUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const username = input.trim()
    if (!username) return
    setLoading(true)
    setError(null)
    setUser(null)
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`)
      if (!res.ok) {
        throw new Error(res.status === 404 ? 'Usuário não encontrado' : `Erro ${res.status}`)
      }
      const data: GithubUser = await res.json()
      setUser(data)
    } catch (err: unknown) {
      setError((err as Error)?.message ?? 'Erro ao buscar usuário')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, Arial' }}>
      <h1>✅ Vite + React + TS funcionando</h1>
      <p>Se você vê isso, o pipeline básico de render está OK.</p>
      </div>
  )
}
