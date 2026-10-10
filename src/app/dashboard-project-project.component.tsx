'use client';

import {Box, Link, Stack, Tooltip} from '@mui/material';
import {VscGithubProject} from 'react-icons/vsc';
import {getProject, GithubProject} from '@/src/services/github.service.ts';
import {useEffect, useState} from "react";

type DashboardProjectProjectProps = {
  id: bigint;
};

export function DashboardProjectProject({ id }: DashboardProjectProjectProps){
  const [projectData, setProjectData] = useState<GithubProject>();
  useEffect(() => {
    getProject(id).then(data => setProjectData(data));
  }, []);
  if(projectData === undefined) return <></>;
  const projectLink = `https://github.com/orgs/ZGameLogic/projects/${projectData.number}`;

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