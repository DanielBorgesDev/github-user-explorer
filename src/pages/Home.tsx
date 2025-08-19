import React, { useState } from 'react'
import { useGithubRepos, useGithubUser } from '../github/ui/hooks'
import { UserCard } from '../github/ui/UserCard'
import { RepoList } from '../github/ui/RepoList'


export function Home() {
  const [input, setInput] = useState('')
  const [username, setUsername] = useState<string | null>('')
  const [page, setPage] = useState(1)

  const userQ = useGithubUser(username)
  const reposQ = useGithubRepos(username, page, 8)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPage(1)
    setUsername(input.trim() || null)
  }

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>GitHub User Explorer</h1>

      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, margin: '12px 0 16px' }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="username (ex: torvalds)" style={{ flex: 1 }} />
        <button type="submit">Buscar</button>
      </form>

      {userQ.isLoading && <p>Carregando perfil…</p>}
      {userQ.error && <p style={{ color: 'crimson' }}>{(userQ.error as Error).message}</p>}
      {userQ.data && <UserCard user={userQ.data} />}

      <div style={{ marginTop: 24 }}>
        <h2>Repositórios recentes</h2>
        {reposQ.isLoading && <p>Carregando repositórios…</p>}
        {reposQ.error && <p style={{ color: 'crimson' }}>{(reposQ.error as Error).message}</p>}
        {reposQ.data && reposQ.data.length > 0 && <RepoList repos={reposQ.data} />}
        {reposQ.data && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Anterior</button>
            <span>Página {page}</span>
            <button disabled={(reposQ.data?.length ?? 0) < 8} onClick={() => setPage(p => p + 1)}>Próxima</button>
          </div>
        )}
      </div>
    </div>
  )
}
