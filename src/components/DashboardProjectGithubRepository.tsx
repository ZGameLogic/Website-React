import { useDashboardData } from "../global/dashboard data/useDashboardData.ts";
import {RiGitRepositoryLine, RiCheckboxCircleLine} from "react-icons/ri";
import { FaRegCircleQuestion } from "react-icons/fa6";
import {Box, Divider, Link, Stack, Tooltip, Typography} from "@mui/material";
import { GoTag } from "react-icons/go";

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
        <Tooltip title={'GitHub Repository'} arrow>
          <RiGitRepositoryLine />
        </Tooltip>
        <Link target="_blank" href={repositoryData?.html_url}>{repositoryData?.name ?? "Loading repository..."}</Link>
      </Stack>
      {repositoryRichData?.release ? <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
        <Tooltip title={'Latest release'} arrow>
          <GoTag />
        </Tooltip>
        <Link target="_blank" href={repositoryRichData.release.html_url}>{repositoryRichData.release.name}</Link>
      </Stack>: <></>}

      {envs.length > 0 &&
        <>
          <Divider textAlign="left">
            <Typography sx={{
              color: 'text.secondary',
              fontSize: '0.68rem'
            }}>Deployments</Typography>
          </Divider>
          <Stack spacing={0.0}>
            {envs.map((env) => {
              const ok = env.status === "success";
              return <Stack key={env.name} direction="row" spacing={1} sx={{alignItems: "center"}}>
                  {ok ? <RiCheckboxCircleLine color="#2e7d32" /> : <FaRegCircleQuestion color="#ed6c02" />}
                  <Typography variant="body2">{env.name}</Typography>
                </Stack>;
            })}
          </Stack>
        </>
      }
    </Box>
  );
}

export default DashboardProjectGithubRepository;