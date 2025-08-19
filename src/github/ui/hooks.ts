import { useQuery } from '@tanstack/react-query'
import { githubRepo } from '../../app/providers/AppProviders'

export function useGithubUser(username: string | null) {
  return useQuery({
    queryKey: ['github-user', username],
    queryFn: async () => {
      if (!username) throw new Error('username required')
      return githubRepo.getUser(username)
    },
    enabled: !!username,
  })
}

export function useGithubRepos(username: string | null, page = 1, perPage = 8) {
  return useQuery({
    queryKey: ['github-repos', username, page, perPage],
    queryFn: async () => {
      if (!username) throw new Error('username required')
      return githubRepo.listUserRepos(username, { page, perPage, sort: 'updated' })
    },
    enabled: !!username,
  })
}
