import React, { useState } from 'react'



interface GithubUser {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  bio: string | null
  location: string | null
  blog: string | null
  followers: number
  following: number
  public_repos: number
  created_at: string
}

export function App() {
  const [input, setInput] = useState('')
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
    <div style={{ maxWidth: 960, margin: '2rem auto', padding: '0 1rem', fontFamily: 'system-ui, Arial' }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>GitHub User Explorer</h1>

      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite um username (ex: torvalds)"
          aria-label="GitHub username"
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: 8 }}
        />
        <button
          type="submit"
          style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #222', background: '#222', color: '#fff' }}
        >
          Buscar
        </button>
      </form>

      {loading && <p>Carregando…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {user && (
        <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <img
              src={user.avatar_url}
              alt={`${user.login} avatar`}
              width={96}
              height={96}
              style={{ borderRadius: '50%' }}
            />
            <div>
              <a href={user.html_url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0a58ca' }}>
                <h2 style={{ margin: '4px 0' }}>{user.name ?? user.login}</h2>
              </a>
              {user.name && <div style={{ color: '#666', marginBottom: 8 }}>@{user.login}</div>}
              {user.bio && <p style={{ marginTop: 8 }}>{user.bio}</p>}
              <div style={{ marginTop: 8, color: '#444', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {user.location && <span> {user.location}</span>}
                {user.blog && (
                  <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noreferrer">
                    🔗 {user.blog}
                  </a>
                )}
              </div>
              <div style={{ marginTop: 8, color: '#444' }}>
                {user.followers} seguidores • seguindo {user.following} • repositórios públicos {user.public_repos}
              </div>
              <div style={{ marginTop: 4, color: '#777', fontSize: 12 }}>
                Membro desde {new Date(user.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}