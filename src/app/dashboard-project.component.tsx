import {Models} from "@/src/prisma/contract";
import public_DashboardProjects = Models.public_DashboardProjects;
import {Card, Typography} from "@mui/material";

type DashboardProjectData = Omit<
  Models.public_DashboardProjects,
  | "additionalProjectAspects"
  | "dataotterApplicationLinks"
  | "githubProjectLinks"
  | "githubRepositoryLinks"
  | "mavenProjectLinks"
> & {
  additionalProjectAspects: Omit<Models.public_AdditionalProjectAspects, "project">[];
  dataotterApplicationLinks: Omit<Models.public_DataotterApplicationLink, "project">[];
  githubProjectLinks: Omit<Models.public_GithubProjectLinks, "project">[];
  githubRepositoryLinks: Omit<Models.public_GithubRepositoryLinks, "project">[];
  mavenProjectLinks: Omit<Models.public_MavenProjectLink, "project">[];
};


export function DashboardProject({project}: {project: DashboardProjectData}){

  return <Card>
    <Typography>{project.name}</Typography>
  </Card>
}