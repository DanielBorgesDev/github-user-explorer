
import type { IGithubRepository } from '../domain/ports'
import { GithubUserSchema, GithubRepoSchema, type GithubUser, type GithubRepo } from '../domain/entities'
import type { HttpClient } from '../../core/http/http';

export class GithubRestRepository implements IGithubRepository {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async getUser(username: string): Promise<GithubUser> {
    const data = await this.http.request(`/users/${encodeURIComponent(username)}`)
    return GithubUserSchema.parse(data)
  }

  async listUserRepos(username: string, opts?: { perPage?: number; page?: number; sort?: 'updated' }): Promise<GithubRepo[]> {
    const params = new URLSearchParams()
    if (opts?.perPage) params.set('per_page', String(opts.perPage))
    if (opts?.page) params.set('page', String(opts.page))
    if (opts?.sort) params.set('sort', opts.sort)
    const data = await this.http.request(`/users/${encodeURIComponent(username)}/repos?${params.toString()}`)
    return GithubRepoSchema.array().parse(data)
  }
}
