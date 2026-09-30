import {Box, Link, Stack, Tooltip} from '@mui/material';
import {VscGithubProject} from 'react-icons/vsc';
import {getProject} from '@/src/services/github.service.ts';

type DashboardProjectProjectProps = {
  id: bigint;
};

export async function DashboardProjectProject({ id }: DashboardProjectProjectProps){
  const projectData = await getProject(id);
  const projectLink = `https://github.com/orgs/ZGameLogic/projects/${projectData}`;

  return (
    <Box
      sx={{
        p: 1.25,
        borderRadius: 1.5,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
        <Tooltip title={'GitHub Project'} arrow>
          <VscGithubProject />
        </Tooltip>
        <Link target="_blank" href={projectLink}>{projectData.title}</Link>
      </Stack>
    </Box>
  );
}