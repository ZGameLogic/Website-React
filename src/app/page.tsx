import { db } from '@/src/prisma/db.ts';
import { Typography } from '@mui/material';
import {getRepositories} from "@/src/services/github.service.ts";
import {DashboardProject} from "@/src/app/dashboard-project.component.tsx";
import {Rpc} from "alchemy";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const projects = await db.orm.public.DashboardProjects
    .include('additionalProjectAspects')
    .include('dataotterApplicationLinks')
    .include('githubProjectLinks')
    .include('githubRepositoryLinks')
    .include('mavenProjectLinks')
    .all();

  // getRepositories().then(res => res.json().then(json => console.log(json)));

  return <>
    {projects.map(proj => <DashboardProject project={proj} key={proj.id} />)}
    </>;
}
