export type DashboardProject = {
  id: string;
  name: string;
  description: string;
  githubProjectLinks: number[];
  githubRepositoryLinks: number[];
};

export type GithubRepository = {
  id: number;
  name: string;
  fullName: string;
  htmlUrl: string;
  stars: number;
  watchers: number;
}

export type GithubRepositoryRich = {
  name: string;
  htmlUrl: string;
}