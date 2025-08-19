
import { useSearchHistory } from '@/core/history/useSearchHistory'
import { useGithubRepos, useGithubUser } from '@/github/ui/hooks'
import { RepoList } from '@/github/ui/RepoList'
import { UserCard } from '@/github/ui/UserCard'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


export function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const { add: addHistory } = useSearchHistory()

  const initialQ = useMemo(() => {
    const qs = new URLSearchParams(location.search)
    return qs.get('q') || 'octocat'
  }, [location.search])

  const [input, setInput] = useState(initialQ)
  const [username, setUsername] = useState<string | null>(initialQ)
  const [page, setPage] = useState(1)

  const userQ = useGithubUser(username)
  const reposQ = useGithubRepos(username, page, 8)

  useEffect(() => {
    setInput(initialQ)
    setUsername(initialQ)
    setPage(1)
  }, [initialQ])

  useEffect(() => {
    if (userQ.data && username) {
      addHistory(username)
    }
  }, [userQ.data, username, addHistory])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = input.trim()
    if (!next) return
    setPage(1)
    navigate(`/?q=${encodeURIComponent(next)}`, { replace: false })
  }

  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, margin: '12px 0 16px' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="username (ex: torvalds)" style={{ flex: 1 }} />
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
            <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Anterior</button>
            <span>Página {page}</span>
            <button disabled={(reposQ.data?.length ?? 0) < 8} onClick={() => setPage((p) => p + 1)}>Próxima</button>
          </div>
        )}
      </div>
    </div>
  )
}
