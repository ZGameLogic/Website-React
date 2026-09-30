import {
  getDeploymentStatus,
  getRepositoryDeployments,
  GithubEnvironment,
  GithubRepository
} from '@/src/services/github.service.ts';
import {Stack, Typography} from '@mui/material';
import {RiCheckboxCircleLine} from 'react-icons/ri';
import {FaRegCircleQuestion} from 'react-icons/fa6';

type DashboardProjectRepositoryDeploymentsProps = {
  envs: GithubEnvironment[]
  gitRepo: GithubRepository
}

export async function DashboardProjectRepositoryDeployments({ envs, gitRepo }: DashboardProjectRepositoryDeploymentsProps){
  const RenderDeployment = async ({env}: { env: GithubEnvironment }) => {
    const deployments = await getRepositoryDeployments(gitRepo, env);
    const statuses = await getDeploymentStatus(deployments[0]);

    const ok = statuses[0].state === 'success';

    return <Stack key={env.name} direction='row' spacing={1} sx={{alignItems: 'center'}}>
      {ok ? <RiCheckboxCircleLine color='#2e7d32' /> : <FaRegCircleQuestion color='#ed6c02' />}
      <Typography variant='body2'>{env.name}</Typography>
    </Stack>;
  };

  return envs.map((env) => <RenderDeployment key={env.id} env={env} /> );
}