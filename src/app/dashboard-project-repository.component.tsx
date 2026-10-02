import {Box, Stack, Tooltip, Link, Typography, Divider, LinearProgress} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import {
  getRepositoryCommitActivity,
  getRepositoryEnvironments,
  getRepositoryMilestones,
  getRepositoryReleases,
  GithubRepository
} from '@/src/services/github.service.ts';
import {RiGitRepositoryLine} from 'react-icons/ri';
import {GoIssueOpened, GoMilestone, GoStar, GoTag} from 'react-icons/go';
import {Suspense} from 'react';
import {DashboardProjectRepositoryDeployments} from '@/src/app/dashboard-project-repository-deployments.component.tsx';
import RepositoryCommitStats from "@/src/app/repository-commit-stats.component.tsx";

type DashboardProjectRepositoryProps = {
  githubRepository: GithubRepository
}

export async function DashboardProjectRepository({githubRepository}: DashboardProjectRepositoryProps){
  const releases = await getRepositoryReleases(githubRepository);
  const environments = await getRepositoryEnvironments(githubRepository);
  const milestones = await getRepositoryMilestones(githubRepository);
  const commitActivity = await getRepositoryCommitActivity(githubRepository);

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
    <RepositoryCommitStats stats={commitActivity} />
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
    </>}
    {milestones.length > 0 && <>
      <Divider textAlign="left">
        <Typography sx={{
          color: 'text.secondary',
          fontSize: '0.68rem'
        }}>Milestones</Typography>
      </Divider>
      {milestones.map(milestone => {
        const total = milestone.closed_issues + milestone.open_issues;
        const progress = ((total - milestone.open_issues) / total) * 100;

        return <Stack key={milestone.id}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Stack direction={'row'} spacing={1} sx={{alignItems: 'center'}}>
              <Tooltip title={'GitHub Milestone'} arrow>
                <GoMilestone />
              </Tooltip>
              <Link target="_blank" href={milestone.html_url}>{milestone.title}</Link>
            </Stack>
            <Stack direction={'row'} spacing={1} sx={{alignItems: 'center'}}>
              <Tooltip title={'Issues'} arrow>
                <GoIssueOpened />
              </Tooltip>
              <Typography>{`${milestone.closed_issues}/${total}`}</Typography>
            </Stack>
          </Box>
          <LinearProgress variant={'determinate'} value={Number(progress)}/>
        </Stack>
      })}
    </>}
  </Box>
}