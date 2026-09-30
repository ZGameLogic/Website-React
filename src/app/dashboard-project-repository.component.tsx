import {Box, Stack, Tooltip, Link} from '@mui/material';
import {GithubRepository} from '@/src/services/github.service.ts';
import {RiGitRepositoryLine} from 'react-icons/ri';

type DashboardProjectRepositoryProps = {
  githubRepository: GithubRepository
}

export async function DashboardProjectRepository({githubRepository}: DashboardProjectRepositoryProps){
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
    </Box>
  </Box>
}