import {Card, Typography} from "@mui/material";
import {findAllDashboardProjects} from "@/src/services/database.service.ts";

export function DashboardProject({project}: {project: Awaited<ReturnType<typeof findAllDashboardProjects>>[number]}){

  return <Card>
    <Typography>{project.name}</Typography>
  </Card>
}