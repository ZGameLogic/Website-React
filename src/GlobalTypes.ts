export type DashboardProject = {
  id: string;
  name: string;
  description: string;
  githubProjectLinks: number[];
  githubRepositoryLinks: number[];
  additionalAspects: string[];
  dataOtterProjectLinks: number[];
};

export type EmitterMessage =
    | { type: 'DONE'; }
    | { type: 'DATA';         body: GithubRepositoryData; }
    | { type: 'RICH_DATA';    body: GithubRepositoryRichData; }
    | { type: 'MONITOR_DATA'; body: DataOtterMonitorRichData; };

export type DataOtterMonitorRichData = {
  id: number;
  status: boolean;
}

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
  release?: {
    html_url: string;
    name: string;
  }
}