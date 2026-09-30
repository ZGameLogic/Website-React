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

type GithubEnvironment = {
  id: bigint
  name: string
  html_url: string
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
  start: bigint
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

function getRepositoryDeployments(gitRepo: GithubRepository, env: GithubEnvironment): GithubDeployment[] {
  return [];
}

function getDeploymentStatus(deployment: GithubDeployment): GithubDeploymentStatus[] {
  return [];
}

function getRepositoryEnvironments(gitRepo: GithubRepository): GithubEnvironment[] {
  return [];
}

function getRepositoryReleases(gitRepo: GithubRepository): GithubRelease[] {
  return [];
}

function getRepositoryMilestones(gitRepo: GithubRepository): GithubMilestone[] {
  return [];
}
