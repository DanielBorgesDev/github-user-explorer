/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FetchHttpClient } from '../../core/http/http'
import { GithubRestRepository } from '../../github/infra/github-rest.repository'
import { env } from '../../core/env'


export const http = new FetchHttpClient(env.VITE_GITHUB_API, env.VITE_REQUEST_TIMEOUT_MS)
export const githubRepo = new GithubRestRepository(http)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 30, refetchOnWindowFocus: false, retry: 1 },
  },
})

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
