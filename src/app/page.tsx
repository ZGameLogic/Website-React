import {DashboardProject} from "@/src/app/dashboard-project.component.tsx";
import {findAllDashboardProjects} from "@/src/services/database.service.ts";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const projects = await findAllDashboardProjects();

  return <>
    {projects.map(proj => <DashboardProject project={proj} key={proj.id} />)}
    </>;
}
