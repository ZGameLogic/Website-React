import {DashboardProject} from '@/src/app/dashboard-project.component.tsx';
import {findAllDashboardProjects} from '@/src/services/database.service.ts';
import {Masonry} from '@mui/lab';
import {Box} from '@mui/material';

export default async function Home() {
  const projects = await findAllDashboardProjects();

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
    {projects.map(proj => <DashboardProject project={proj} key={proj.id} />)}
    </Masonry>
  </Box>;
}
