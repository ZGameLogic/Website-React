import { useDashboardData } from "../global/dashboard data/useDashboardData.ts";
import { VscGithubProject } from "react-icons/vsc";
import {Box, Link, Stack, Tooltip} from "@mui/material";

type DashboardProjectGithubProjectProps = {
  id: number;
};

function DashboardProjectGithubProject({ id }: DashboardProjectGithubProjectProps) {
  const projectData = useDashboardData().getGithubProjectData(id);
  const projectLink = `https://github.com/orgs/ZGameLogic/projects/${projectData?.number}`;

  return (
    <Box
      sx={{
        p: 1.25,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
        <Tooltip title={'GitHub Project'} arrow>
          <VscGithubProject />
        </Tooltip>
        <Link target="_blank" href={projectLink}>{projectData?.title ?? "Loading project..."}</Link>
      </Stack>
    </Box>
  );
}

export default DashboardProjectGithubProject;