'use server';

import { cacheLife } from 'next/cache'

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
  open_issues: bigint
  closed_issues: bigint
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

export async function getRepositories(): Promise<GithubRepository[]> {
  'use cache';
  cacheLife('days');

  try {
    const query = new URLSearchParams({
      'per_page': '100'
    }).toString();

    const response = await fetch(`https://api.github.com/orgs/zgamelogic/repos?${query}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ process.env.GITHUB_TOKEN}`,
        'X-Github-Api-Version': '2026-03-10'
      }
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? (data as GithubRepository[]) : [];
  } catch {
    return [];
  }
}

export async function getProject(projectId: bigint): Promise<GithubProject> {
  'use cache';
  cacheLife('days');

  const response = await fetch(`https://api.github.com/orgs/ZGameLogic/projectsV2/${projectId.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ process.env.GITHUB_TOKEN}`,
      'X-Github-Api-Version': '2026-03-10'
    }
  });

  const data = await response.json();
  return data as GithubProject;
}

function getRepositoryLanguages(gitRepo: GithubRepository): Record<string, number>{
  return {};
}

export async function getRepositoryDeployments(gitRepo: GithubRepository, env: GithubEnvironment): Promise<GithubDeployment[]> {
  'use cache';
  cacheLife('days');

  try {
    const query = new URLSearchParams({
      'environment': env.name
    }).toString();

    const response = await fetch(`${gitRepo.deployments_url}?${query.toString()}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ process.env.GITHUB_TOKEN}`,
        'X-Github-Api-Version': '2026-03-10'
      }
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? (data as GithubDeployment[]) : [];
  } catch {
    return [];
  }
}

export async function getDeploymentStatus(deployment: GithubDeployment): Promise<GithubDeploymentStatus[]> {
  'use cache';
  cacheLife('days');

  try {
    const response = await fetch(`${deployment.statuses_url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ process.env.GITHUB_TOKEN}`,
        'X-Github-Api-Version': '2026-03-10'
      }
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? (data as GithubDeploymentStatus[]) : [];
  } catch {
    return [];
  }
}

export async function getRepositoryEnvironments(gitRepo: GithubRepository): Promise<GithubEnvironment[]> {
  'use cache';
  cacheLife('days');

  try {
    const response = await fetch(`https://api.github.com/repos/zgamelogic/${gitRepo.name}/environments`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ process.env.GITHUB_TOKEN}`,
        'X-Github-Api-Version': '2026-03-10'
      }
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json() as GithubEnvironmentsResponse;

    return data.environments;
  } catch {
    return [];
  }
}

export async function getRepositoryReleases(gitRepo: GithubRepository): Promise<GithubRelease[]> {
  'use cache';
  cacheLife('days');

  try {
    const response = await fetch(`https://api.github.com/repos/zgamelogic/${gitRepo.name}/releases`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ process.env.GITHUB_TOKEN}`,
        'X-Github-Api-Version': '2026-03-10'
      }
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? (data as GithubRelease[]) : [];
  } catch {
    return [];
  }
}

function getRepositoryMilestones(gitRepo: GithubRepository): GithubMilestone[] {
  return [];
}
