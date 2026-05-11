import {createContext, type PropsWithChildren, useContext, useEffect, useState} from "react";
import type {
  DashboardProject,
  EmitterMessage,
  GithubRepositoryData,
  GithubRepositoryRichData
} from "../GlobalTypes.ts";

export type DashboardDataContextType = {
  dashboardProjects: DashboardProject[];
  isInitialLoading: boolean;
  isLoadingRepositoryData: (repoId: number) => boolean;
  getRepositoryData: (repoId: number) => GithubRepositoryData | undefined;
  getDashboardProject: (projectId: number) => DashboardProject;
};

const DashboardDataContext = createContext<DashboardDataContextType>({
  dashboardProjects: [],
  isInitialLoading: true,
  isLoadingRepositoryData: () => true,
  getRepositoryData: () => undefined,
  getDashboardProject: () => {}
});

export function DashboardDataProvider({ children }: PropsWithChildren) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [dashboardProjects, setDashboardProjects] = useState<DashboardProject[]>([]);
  const [githubRepositories, setGithubRepositories] = useState<GithubRepositoryData[]>([]);
  const [githubRepoRichData, setGithubRepoRichData] = useState<GithubRepositoryRichData[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/dashboard/projects`)
      .then(res => res.json())
      .then(data => {
        setDashboardProjects(data);
        setIsInitialLoading(false);
      });
    const stream = new EventSource(`${import.meta.env.VITE_BACKEND_API_URL}/dashboard/projects/rich`);

    stream.onmessage = (event) => {
      const parsed : EmitterMessage = JSON.parse(event.data);
      switch (parsed.type) {
        case 'DATA':
          setGithubRepositories(prev => [...prev, parsed.body]);
          break;
        case 'RICH_DATA':
          setGithubRepoRichData(prev => [...prev, parsed.body]);
          break;
        case 'DONE':
          stream.close();
          return;
          break;
        default:
          console.warn("Unknown message type:", parsed.type);
      }
    };

    return () => {
      stream.close();
    };
  }, []);

  const isLoadingRepositoryData = useCallback((repoId: number) => {
    return githubRepositories.filter(repo => repo.id === repoId).length !== 0 &&
        githubRepoRichData.filter(repo => repo.id === repoId).length !== 0;
  }, [githubRepositories, githubRepoRichData]);

  const getRepositoryData = useCallback((repoId: number) => {
    return githubRepositories.find(repo => repo.id === repoId);
  }, [githubRepositories]);

  const getDashboardProject = useCallback((projectId: number) => {
    return dashboardProjects.find(project => project.id === projectId);
  });

  return <DashboardDataContext.Provider value={{
    dashboardProjects,
    isInitialLoading,
    isLoadingRepositoryData,
    getRepositoryData,
    getDashboardProject
  }}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData() {
  return useContext(DashboardDataContext);
}