import {Box, Stack, Tooltip, Link, Typography, Divider} from '@mui/material';
import {getRepositoryEnvironments, getRepositoryReleases, GithubRepository} from '@/src/services/github.service.ts';
import {RiGitRepositoryLine} from 'react-icons/ri';
import {GoStar, GoTag} from 'react-icons/go';
import {Suspense} from 'react';
import {DashboardProjectRepositoryDeployments} from '@/src/app/dashboard-project-repository-deployments.component.tsx';

type DashboardProjectRepositoryProps = {
  githubRepository: GithubRepository
}

export async function DashboardProjectRepository({githubRepository}: DashboardProjectRepositoryProps){
  const releases = await getRepositoryReleases(githubRepository);
  const environments = await getRepositoryEnvironments(githubRepository);

  return <Box
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
        <Link target="_blank" href={githubRepository.html_url}>{githubRepository.name}</Link>
      </Stack>
      {githubRepository.stargazers_count > 0 && <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
        <Tooltip title={'GitHub Starts'} arrow>
          <GoStar/>
        </Tooltip>
        <Typography>{githubRepository.stargazers_count}</Typography>
      </Stack>}
    </Box>
    {releases.length > 0 && <Stack direction='row' spacing={1} sx={{alignItems: 'center'}}>
      <Tooltip title={'Latest release'} arrow>
        <GoTag />
      </Tooltip>
      <Link target="_blank" href={releases[0].html_url}>{releases[0].name}</Link>
    </Stack>}
    {environments.length > 0 && <>
      <Divider textAlign="left">
          <Typography sx={{
            color: 'text.secondary',
            fontSize: '0.68rem'
          }}>Deployments</Typography>
      </Divider>
        <Stack spacing={0.0}>
          <Suspense fallback={<Typography>Loading environments</Typography>}>
            <DashboardProjectRepositoryDeployments envs={environments} gitRepo={githubRepository} />
          </Suspense>
        </Stack>
      </>
    }
  </Box>
}