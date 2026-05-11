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
  id: number;
  environments: [{
    name: string;
    status: string;
  }];
}

export type EmitterMessage =
    | { type: 'DONE';      body: undefined }
    | { type: 'DATA';      body: EmitterData }
    | { type: 'RICH_DATA'; body: EmitterRichData };

export type EmitterData = {}
export type EmitterRichData = {}