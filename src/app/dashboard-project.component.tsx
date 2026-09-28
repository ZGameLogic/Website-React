import {Models} from "@/src/prisma/contract";
import public_DashboardProjects = Models.public_DashboardProjects;
import {Card, Typography} from "@mui/material";

export function DashboardProject({project}: {project: public_DashboardProjects}){
  return <Card>
    <Typography>{project.name}</Typography>
  </Card>
}