export type DashboardProject = {
  id: string;
  name: string;
  description: string;
  favorite: boolean | null;
  githubProjectLinks: number[];
  githubRepositoryLinks: number[];
  additionalAspects: string[];
  dataOtterProjectLinks: number[];
  mavenUrls: string[];
};

export type EmitterMessage =
    | { type: 'DONE'; }
    | { type: 'DATA';         body: GithubRepositoryData; }
    | { type: 'RICH_DATA';    body: GithubRepositoryRichData; }
    | { type: 'MONITOR_DATA'; body: DataOtterMonitorRichData; }
    | { type: 'PROJECT_DATA'; body: GithubProjectData; };

export type DataOtterMonitorRichData = {
  id: number;
  status: boolean;
}

export type GithubProjectData = {
  id: number;
  number: number;
  title: string;
  description: string;
};

export type GitHubNameId = {
  name: string;
  id: number;
};

export type GitHubOptionId = {
  name: string;
  id: string;
};

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
  stargazers_count: number;
}

export type GithubRepositoryMilestone = {
  html_url: string;
  id: number;
  number: number;
  title: string;
  open_issues: number;
  closed_issues: number;
}

export type GithubRepositoryRichData = {
  id: number;
  environments: [{
    name: string;
    status: string;
  }];
  languages: [string:number];
  release?: {
    html_url: string;
    name: string;
  }
  milestones: GithubRepositoryMilestone[];
}