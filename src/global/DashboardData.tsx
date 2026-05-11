import {createContext, type PropsWithChildren, useContext, useEffect, useState} from "react";
import type {DashboardProject, EmitterMessage} from "../GlobalTypes.ts";

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
    const stream = new EventSource(`${import.meta.env.VITE_BACKEND_API_URL}/dashboard/projects/rich`);

    stream.onmessage = (event) => {
      if(!event.data) return;
      const parsed : EmitterMessage = JSON.parse(event.data);
      switch (parsed.type) {
        case 'DATA':
          // TODO implement
          break;
        case 'RICH_DATA':
          // TODO implement
          break;
        case 'DONE':
          steam.close();
          return;
          break;
        default:
          console.warn("Unknown message type:", parsed.type);
      }

      console.log("Parsed SSE payload:", parsed);
    };

    return () => {
      stream.close();
    };
  }, []);

  return <DashboardDataContext.Provider value={{
    dashboardProjects,
    isInitialLoading
  }}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData() {
  return useContext(DashboardDataContext);
}