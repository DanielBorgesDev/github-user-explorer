import { Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { HistoryPage } from '@/pages/History'
import './index.css'
import { Layout } from './ui/Layout'

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Layout>
  )
}
