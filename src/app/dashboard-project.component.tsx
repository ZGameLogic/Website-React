import {Card, CardContent, Divider, Typography} from '@mui/material';
import {findAllDashboardProjects} from '@/src/services/database.service.ts';

export function DashboardProject({project}: {project: Awaited<ReturnType<typeof findAllDashboardProjects>>[number]}){

  return <Card>
    <CardContent>
      <Typography variant={'h5'}>{project.name}</Typography>
      <Typography>{project.description}</Typography>
      { project.dataotterApplicationLinks.length > 0 && <Divider textAlign={'left'}>
          <Typography sx={{
            color: 'text.secondary',
            fontSize: '0.68rem'
          }}>Data Otter Monitors</Typography>
        {/* TODO get data otter monitor status */}
      </Divider> }
      { project.githubProjectLinks.length > 0 && <Divider textAlign={'left'}>
          <Typography sx={{
            color: 'text.secondary',
            fontSize: '0.68rem'
          }}>Github Projects</Typography>
        {/* TODO get github project */}
      </Divider> }
      { project.githubRepositoryLinks.length > 0 && <Divider textAlign={'left'}>
          <Typography sx={{
            color: 'text.secondary',
            fontSize: '0.68rem'
          }}>Github Repositories</Typography>
        {/* TODO get github repositories */}
      </Divider> }
      { project.githubProjectLinks.length > 0 && <Divider textAlign={'left'}>
          <Typography sx={{
            color: 'text.secondary',
            fontSize: '0.68rem'
          }}>Project Languages/Frameworks</Typography>
        {/* TODO get github languages */}
      </Divider> }
    </CardContent>
  </Card>
}