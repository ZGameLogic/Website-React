'use client';

import {PropsWithChildren, useEffect, useState} from 'react';
import {GlobalDataContext} from '@/src/global/global-data.context.ts';
import {
  DataOtterDeviceStatus,
  getDataOtterDevices
} from "@/src/services/dataotter.service.ts";
import {findAllDashboardProjects} from "@/src/services/database.service.ts";
import {getRepositories, GithubRepository} from "@/src/services/github.service.ts";

export function GlobalDataProvider({children}: PropsWithChildren) {
  const [statuses, setStatuses] = useState<DataOtterDeviceStatus[]>([]);
  const [dashboardProjects, setDashboardProjects] = useState<Awaited<ReturnType<typeof findAllDashboardProjects>>>([]);
  const [githubRepositories, setGithubRepositories] = useState<GithubRepository[]>([]);

  useEffect(() => {
    getDataOtterDevices().then(data => setStatuses(data));
    findAllDashboardProjects().then(data => setDashboardProjects(data));
    getRepositories().then(data => setGithubRepositories(data));
  }, []);

  return <GlobalDataContext.Provider value={{
    dataOtter: {
      deviceStatuses: statuses
    },
    dashboardProjects,
    github: {
      repositories: githubRepositories
    }
  }}>{children}</GlobalDataContext.Provider>
}