import type { GithubUser, GithubRepo } from './entities'

export interface IGithubRepository {
  getUser(username: string): Promise<GithubUser>
  listUserRepos(username: string, opts?: { perPage?: number; page?: number; sort?: 'updated' }): Promise<GithubRepo[]>
}
