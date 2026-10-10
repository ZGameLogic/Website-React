'use client';

import {createContext} from 'react';
import {DataOtterDeviceStatus} from '@/src/services/dataotter.service.ts';
import {findAllDashboardProjects} from "@/src/services/database.service.ts";
import {GithubRepository} from "@/src/services/github.service.ts";

export type GlobalDataContextType = {
  dataOtter: {
    deviceStatuses: DataOtterDeviceStatus[];
  };
  dashboardProjects: Awaited<ReturnType<typeof findAllDashboardProjects>>;
  github: {
    repositories: GithubRepository[];
  };
}

export const GlobalDataContext = createContext<GlobalDataContextType>({
  dataOtter: {
    deviceStatuses: []
  },
  dashboardProjects: [],
  github: {
    repositories: []
  }
});