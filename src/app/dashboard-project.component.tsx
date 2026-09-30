import {Box, Card, CardContent, Divider, Typography} from '@mui/material';
import {findAllDashboardProjects} from '@/src/services/database.service.ts';
import {Suspense} from 'react';
import {DashboardProjectProject} from '@/src/app/dashboard-project-project.component.tsx';
import {GithubRepository} from '@/src/services/github.service.ts';
import {DashboardProjectRepository} from '@/src/app/dashboard-project-repository.component.tsx';

type DashboardProjectProps = {
  project: Awaited<ReturnType<typeof findAllDashboardProjects>>[number];
  githubRepositories: GithubRepository[];
}

export function DashboardProject({project, githubRepositories}: DashboardProjectProps){

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
      { project.githubProjectLinks.length > 0 && <>
      <Divider textAlign={'left'}>
          <Typography sx={{
            color: 'text.secondary',
            fontSize: '0.68rem'
          }}>Github Projects</Typography>
        </Divider>
        <Box sx={{marginY: 1}}>
          {project.githubProjectLinks.map(link => <Suspense fallback={<Typography>Loading</Typography>} key={link.githubProjectId}>
              <DashboardProjectProject id={link.githubProjectId ?? BigInt(0)} />
            </Suspense>
          )}
        </Box>
      </>
      }
      { project.githubRepositoryLinks.length > 0 && <>
      <Divider textAlign={'left'}>
          <Typography sx={{
            color: 'text.secondary',
            fontSize: '0.68rem'
          }}>Github Repositories</Typography>
      </Divider>
      <Box sx={{marginY: 1}}>
        {githubRepositories.map(repo => {
          return <Suspense key={repo.id} fallback={<Typography>Loading Repo</Typography>}>
            <DashboardProjectRepository githubRepository={repo}/>
          </Suspense>
        })}
      </Box>
      </>
      }
      <Divider textAlign={'left'}>
        <Typography sx={{
          color: 'text.secondary',
          fontSize: '0.68rem'
        }}>Project Languages/Frameworks</Typography>
        {/* TODO get github languages */}
      </Divider>
    </CardContent>
  </Card>
}