import { type PropsWithChildren, useCallback, useEffect, useState } from "react";
import type {
  DashboardProject, DataOtterMonitorRichData,
  EmitterMessage,
  GithubRepositoryData,
  GithubRepositoryRichData
} from "../../GlobalTypes.ts";
import { DashboardDataContext } from "./DashboardDataContext";

export function DashboardDataProvider({ children }: PropsWithChildren) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [dashboardProjects, setDashboardProjects] = useState<DashboardProject[]>([]);
  const [githubRepositories, setGithubRepositories] = useState<GithubRepositoryData[]>([]);
  const [githubRepoRichData, setGithubRepoRichData] = useState<GithubRepositoryRichData[]>([]);
  const [monitorRichData, setMonitorRichData] = useState<DataOtterMonitorRichData[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/dashboard/projects`)
      .then(res => res.json())
      .then(data => {
        setDashboardProjects(data);
        setIsInitialLoading(false);
      });

    const stream = new EventSource(`${import.meta.env.VITE_BACKEND_API_URL}/dashboard/projects/rich`);

    stream.onmessage = (event) => {
      const parsed: EmitterMessage = JSON.parse(event.data);

      switch (parsed.type) {
        case "DATA":
          setGithubRepositories(prev => [...prev, parsed.body]);
          break;
        case "RICH_DATA":
          setGithubRepoRichData(prev => [...prev, parsed.body]);
          break;
        case "MONITOR_DATA":
          setMonitorRichData(prev => [...prev, parsed.body]);
          break;
        case "DONE":
          stream.close();
          return;
        default:
          break;
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

  const getRepositoryRichData = useCallback((repoId: number) => {
    return githubRepoRichData.find(repo => repo.id === repoId);
  }, [githubRepoRichData]);

  const getDashboardProject = useCallback((projectId: string) => {
    return dashboardProjects.find(project => project.id === projectId);
  }, [dashboardProjects]);

  const getMonitorRichData = useCallback((applicationId: number) => {
    return monitorRichData.find(application => application.id === applicationId);
  }, [monitorRichData]);

  return (
    <DashboardDataContext.Provider
      value={{
        dashboardProjects,
        isInitialLoading,
        isLoadingRepositoryData,
        getRepositoryData,
        getDashboardProject,
        getRepositoryRichData,
        getMonitorRichData
      }}
    >
      {children}
    </DashboardDataContext.Provider>
  );
}