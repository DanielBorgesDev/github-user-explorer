import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Home } from './pages/Home'
import { HistoryPage } from './pages/History'

export function App() {
  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 1rem' }}>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ marginRight: 'auto' }}>GitHub User Explorer</h1>
        <nav style={{ display: 'flex', gap: 8 }}>
          <Link to="/">Início</Link>
          <Link to="/history">Histórico</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </div>
  )
}
