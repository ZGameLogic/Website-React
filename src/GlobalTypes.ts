export type DashboardProject = {
  id: string;
  name: string;
  description: string;
  githubProjectLinks: number[];
  githubRepositoryLinks: number[];
  additionalAspects: string[];
};

export type EmitterMessage =
    | { type: 'DONE'; }
    | { type: 'DATA';      body: GithubRepositoryData }
    | { type: 'RICH_DATA'; body: GithubRepositoryRichData };

export type GithubRepositoryData = {
  deployments_url: string;
  description: string;
  full_name: string
  html_url: string;
  id: number;
  languages_url: string;
  name: string;
  private: boolean;
  releases_url: string;
}

export type GithubRepositoryRichData = {
  id: number;
  environments: [{
    name: string;
    status: string;
  }];
  languages: [string:number];
}