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
  const [isInitialLoading, _] = useState(true);
  const [dashboardProjects, setDashboardProjects] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/dashboard/projects`)
      .then(res => res.json())
      .then(data => setDashboardProjects(data));
  }, []);

  return <DashboardDataContext.Provider value={{
    dashboardProjects,
    isInitialLoading
  }}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData() {
  return useContext(DashboardDataContext);
}