import { useDashboardData } from "../global/dashboard data/useDashboardData.ts";
import { RiGitRepositoryLine, RiCheckboxCircleLine } from "react-icons/ri";
import { FaRegCircleQuestion } from "react-icons/fa6";
import {Box, Link, Stack, Typography} from "@mui/material";

type DashboardProjectGithubRepositoryProps = {
  id: number;
};

function DashboardProjectGithubRepository({ id }: DashboardProjectGithubRepositoryProps) {
  const repositoryData = useDashboardData().getRepositoryData(id);
  const repositoryRichData = useDashboardData().getRepositoryRichData(id);

  const envs = repositoryRichData?.environments ?? [];

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
        <RiGitRepositoryLine />
          <Link target="_blank" href={repositoryData?.html_url}>{repositoryData?.name ?? "Loading repository..."}</Link>
      </Stack>

      {envs.length === 0 ?  <></> :
        <Stack spacing={0.75}>
          {envs.map((env) => {
            const ok = env.status === "success";
            return (
              <Stack key={env.name} direction="row" spacing={1} sx={{alignItems: "center"}}>
                {ok ? <RiCheckboxCircleLine color="#2e7d32" /> : <FaRegCircleQuestion color="#ed6c02" />}
                <Typography variant="body2">{env.name}</Typography>
              </Stack>
            );
          })}
        </Stack>
      }
    </Box>
  );
}

export default DashboardProjectGithubRepository;