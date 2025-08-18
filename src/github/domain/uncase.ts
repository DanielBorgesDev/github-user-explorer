import type { IGithubRepository } from './ports'
import type { GithubUser } from './entities'

export class GetUserProfile {
  private readonly repo: IGithubRepository;
  constructor(repo: IGithubRepository) {
    this.repo = repo;
  }
  exec(username: string): Promise<GithubUser> {
    return this.repo.getUser(username)
  }
}
