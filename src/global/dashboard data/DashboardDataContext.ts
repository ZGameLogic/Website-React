import { createContext } from "react";
import type {DashboardProject, GithubRepositoryData, GithubRepositoryRichData} from "../../GlobalTypes.ts";

export type DashboardDataContextType = {
  dashboardProjects: DashboardProject[];
  isInitialLoading: boolean;
  isLoadingRepositoryData: (repoId: number) => boolean;
  getRepositoryData: (repoId: number) => GithubRepositoryData | undefined;
  getDashboardProject: (projectId: string) => DashboardProject | undefined;
  getRepositoryRichData: (repoId: number) => GithubRepositoryRichData | undefined;
};

export const DashboardDataContext = createContext<DashboardDataContextType>({
  dashboardProjects: [],
  isInitialLoading: true,
  isLoadingRepositoryData: () => true,
  getRepositoryData: () => undefined,
  getDashboardProject: () => undefined,
  getRepositoryRichData: () => undefined
});