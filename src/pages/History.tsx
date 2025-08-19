import { useSearchHistory } from '../core/history/useSearchHistory'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export function HistoryPage() {
  const { items, clear } = useSearchHistory()
  const navigate = useNavigate()

  function repeat(username: string) {
    navigate(`/?q=${encodeURIComponent(username)}`)
  }

  return (
    <div>
      <h2>Histórico de buscas</h2>

      <div style={{ margin: '12px 0 16px' }}>
        <button onClick={clear} disabled={items.length === 0}>Limpar histórico</button>
      </div>

      {items.length === 0 ? (
        <p>Nenhuma busca realizada ainda.</p>
      ) : (
        <ul style={{ display: 'grid', gap: 8 }}>
          {items.map(item => (
            <li key={item.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div><strong>@{item.username}</strong></div>
                <div style={{ fontSize: 12, color: '#666' }}>
                  {new Date(item.at).toLocaleString()}
                </div>
              </div>
              <button onClick={() => repeat(item.username)}>Repetir busca</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
