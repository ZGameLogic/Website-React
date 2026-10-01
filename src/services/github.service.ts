'use server';

type GithubDeployment = {
  id: bigint
  environment: string
  statuses_url: string
  create_at: string
}

type GithubRelease = {
  html_url: string
  name: string
}

type GithubDeploymentStatus = {
  state: string
}

export type GithubEnvironment = {
  id: bigint
  name: string
  html_url: string
}

type GithubEnvironmentsResponse = {
  total_count: number
  environments: GithubEnvironment[]
}

type GithubMilestone = {
  id: bigint
  html_url: string
  number: bigint
  title: string
  open_issues: number
  closed_issues: number
}

type GithubUser = {
  login: string
  id: bigint
  avatar_url: string
  html_url: string
  type: string
}

type GithubProject = {
  id: bigint
  number: bigint
  title: string
  description: string
  short_description: string
  public: boolean
  owner: GithubUser
}

export type GithubRepository = {
  name: string
  full_name: string
  private: boolean
  html_url: string
  languages_url: string
  deployments_url: string
  releases_url: string
  milestones_url: string
  description: string
  id: bigint
  stargazers_count: bigint
  watchers: bigint
  owner: GithubUser
}

function fetchWithAuthorization(input: string){
  return fetch(input, {
    method: 'GET',
    next: { revalidate: 86400 },
    headers: {
      Authorization: `Bearer ${ process.env.GITHUB_TOKEN}`,
      'X-Github-Api-Version': '2026-03-10'
    }
  })
}

export async function getRepositories(): Promise<GithubRepository[]> {
  try {
    const query = new URLSearchParams({
      'per_page': '100'
    }).toString();

    const response = await fetchWithAuthorization(`https://api.github.com/orgs/zgamelogic/repos?${query}`);

    if (!response.ok) return [];

    const data = await response.json();
    return Array.isArray(data) ? (data as GithubRepository[]) : [];
  } catch {
    return [];
  }
}

export async function getProject(projectId: bigint): Promise<GithubProject> {
  const response = await fetchWithAuthorization(`https://api.github.com/orgs/ZGameLogic/projectsV2/${projectId.toString()}`);

  const data = await response.json();
  return data as GithubProject;
}

export async function getRepositoryLanguages(gitRepo: GithubRepository): Promise<string[]> {
  try {
    const response = await fetchWithAuthorization(gitRepo.languages_url);
    if(!response.ok) return [];

    const data = await response.json();
    return Object.keys(data)
  } catch {
    return [];
  }
}

export async function getRepositoryDeployments(gitRepo: GithubRepository, env: GithubEnvironment): Promise<GithubDeployment[]> {
  try {
    const query = new URLSearchParams({
      'environment': env.name
    }).toString();

    const response = await fetchWithAuthorization(`${gitRepo.deployments_url}?${query.toString()}`);

    if (!response.ok) return [];

    const data = await response.json();
    return Array.isArray(data) ? (data as GithubDeployment[]) : [];
  } catch {
    return [];
  }
}

export async function getDeploymentStatus(deployment: GithubDeployment): Promise<GithubDeploymentStatus[]> {
  try {
    const response = await fetchWithAuthorization(`${deployment.statuses_url}`);

    if (!response.ok) return [];

    const data = await response.json();
    return Array.isArray(data) ? (data as GithubDeploymentStatus[]) : [];
  } catch {
    return [];
  }
}

export async function getRepositoryEnvironments(gitRepo: GithubRepository): Promise<GithubEnvironment[]> {
  try {
    const response = await fetchWithAuthorization(`https://api.github.com/repos/zgamelogic/${gitRepo.name}/environments`);

    if (!response.ok) return [];

    const data = await response.json() as GithubEnvironmentsResponse;

    return data.environments;
  } catch {
    return [];
  }
}

export async function getRepositoryReleases(gitRepo: GithubRepository): Promise<GithubRelease[]> {
  try {
    const response = await fetchWithAuthorization(`https://api.github.com/repos/zgamelogic/${gitRepo.name}/releases`);

    if (!response.ok) return [];

    const data = await response.json();
    return Array.isArray(data) ? (data as GithubRelease[]) : [];
  } catch {
    return [];
  }
}

export async function getRepositoryMilestones(gitRepo: GithubRepository): Promise<GithubMilestone[]> {
  try {
    const response = await fetchWithAuthorization(`https://api.github.com/repos/zgamelogic/${gitRepo.name}/milestones`);

    if (!response.ok) return [];

    const data = await response.json();
    return Array.isArray(data) ? (data as GithubMilestone[]) : [];
  } catch {
    return [];
  }
}
