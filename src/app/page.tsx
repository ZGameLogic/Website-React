'use client';

import {DashboardProject} from '@/src/app/dashboard-project.component.tsx';
import {Masonry} from '@mui/lab';
import {Box} from '@mui/material';
import {useGlobalData} from '@/src/global/global-data.hook.ts';

export default function Home() {
  const { dashboardProjects: projects, github } = useGlobalData();

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
      const projectRepos = github.repositories.filter(r => {
        return proj.githubRepositoryLinks.map(rl => rl.githubRepositoryId).includes(BigInt(r.id));
      });
      return <DashboardProject githubRepositories={projectRepos} project={proj} key={proj.id}/>;
    })}
    </Masonry>
  </Box>;
}
