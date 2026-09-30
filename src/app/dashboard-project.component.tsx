import {Box, Card, CardContent, CircularProgress, Divider, Stack, Tooltip, Typography} from '@mui/material';
import {findAllDashboardProjects} from '@/src/services/database.service.ts';
import {Suspense} from 'react';
import {DashboardProjectProject} from '@/src/app/dashboard-project-project.component.tsx';
import {GithubRepository} from '@/src/services/github.service.ts';
import {DashboardProjectRepository} from '@/src/app/dashboard-project-repository.component.tsx';
import {RiGitRepositoryLine} from 'react-icons/ri';

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
          return <Suspense key={repo.id} fallback={<>
            <Box
              sx={{
                p: 1.25,
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
                  <Tooltip title={'GitHub Repository'} arrow>
                    <RiGitRepositoryLine />
                  </Tooltip>
                  <CircularProgress size={20} />
                  <Typography>Loading Repository...</Typography>
                </Stack>
              </Box>
            </Box>
          </>}>
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