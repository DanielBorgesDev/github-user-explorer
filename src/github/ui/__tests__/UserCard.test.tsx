import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { UserCard } from '../UserCard'

const user = {
  login: 'octocat',
  id: 1,
  avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  html_url: 'https://github.com/octocat',
  name: 'The Octocat',
  company: null,
  blog: null,
  location: 'Internet',
  bio: 'Mascote',
  public_repos: 1,
  followers: 10,
  following: 0,
  created_at: new Date().toISOString(),
}

test('renderiza dados básicos do usuário', () => {
  render(<UserCard user={user} />)
  expect(screen.getByText('The Octocat')).toBeInTheDocument()
  expect(screen.getByText(/octocat/)).toBeInTheDocument()
  expect(screen.getByText(/Mascote/)).toBeInTheDocument()
})
