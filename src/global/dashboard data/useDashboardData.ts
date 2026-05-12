import { useContext } from "react";
import { DashboardDataContext } from "./DashboardDataContext";

export function useDashboardData() {
  return useContext(DashboardDataContext);
}