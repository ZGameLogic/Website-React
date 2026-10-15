import {DashboardProject} from '@/src/app/dashboard-project.component.tsx';
import {findAllDashboardProjects} from '@/src/services/database.service.ts';
import {Masonry} from '@mui/lab';
import {Box} from '@mui/material';
import {getRepositories} from '@/src/services/github.service.ts';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const projects = await findAllDashboardProjects();
  const repos = await getRepositories();

  return <Box
    sx={{
      width: '100%',
      gap: 2,
      padding: 1,
    }}
  >
    <Masonry
    columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
    spacing={2}
  >
    {projects.sort((a, b) => {
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;
      return 0;
    }).map(proj => {
      const projectRepos = repos.filter(r => {
        return proj.githubRepositoryLinks.map(rl => rl.githubRepositoryId).includes(BigInt(r.id));
      });
      return <DashboardProject githubRepositories={projectRepos} project={proj} key={proj.id}/>;
    })}
    </Masonry>
  </Box>;
}
