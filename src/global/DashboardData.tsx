import {createContext, type PropsWithChildren, useContext, useEffect, useState} from "react";
import type {DashboardProject} from "../GlobalTypes.ts";

export type DashboardDataContextType = {
  dashboardProjects: DashboardProject[];
  isInitialLoading: boolean;
};

const DashboardDataContext = createContext<DashboardDataContextType>({
  dashboardProjects: [],
  isInitialLoading: true
});

export function DashboardDataProvider({ children }: PropsWithChildren) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [dashboardProjects, setDashboardProjects] = useState([]);

  useEffect(() => {
    console.log('Bep');
  }, []);

  return <DashboardDataContext.Provider value={{
    dashboardProjects,
    isInitialLoading
  }}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData() {
  return useContext(DashboardDataContext);
}