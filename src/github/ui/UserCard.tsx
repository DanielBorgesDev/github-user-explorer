import type { GithubUser } from '../domain/entities'

export function UserCard({ user }: { user: GithubUser }) {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <img src={user.avatar_url} width={96} height={96} style={{ borderRadius: '50%' }} alt={`${user.login} avatar`} />
        <div>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            <h2 style={{ margin: '4px 0' }}>{user.name ?? user.login}</h2>
          </a>
          {user.name && <div style={{ color: '#666' }}>@{user.login}</div>}
          {user.bio && <p style={{ marginTop: 8 }}>{user.bio}</p>}
          <div style={{ marginTop: 8, color: '#444', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {user.location && <span>📍 {user.location}</span>}
            <span> {user.followers} • seguindo {user.following}</span>
            <span> {user.public_repos} repos</span>
          </div>
          <div style={{ marginTop: 4, color: '#777', fontSize: 12 }}>
            Membro desde {new Date(user.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}
