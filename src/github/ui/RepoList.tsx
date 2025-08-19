import type { GithubRepo } from '../domain/entities'

export function RepoList({ repos }: { repos: GithubRepo[] }) {
  return (
    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
      {repos.map((r) => (
        <li key={r.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
          <a href={r.html_url} target="_blank" rel="noreferrer"><strong>{r.name}</strong></a>
          {r.description && <p style={{ marginTop: 6 }}>{r.description}</p>}
          <div style={{ marginTop: 8, fontSize: 12, color: '#555', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {r.language && <span>🏷 {r.language}</span>}
            <span>⭐ {r.stargazers_count}</span>
            <span>⑂ {r.forks_count}</span>
            <span style={{ marginLeft: 'auto' }}>Atualizado {new Date(r.updated_at).toLocaleDateString()}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
