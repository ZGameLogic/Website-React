import {useDashboardData} from "../global/dashboard data/useDashboardData.ts";
import { RiGitRepositoryLine, RiCheckboxCircleLine } from "react-icons/ri";
import { FaRegCircleQuestion } from "react-icons/fa6";
import {Stack, Typography} from "@mui/material";

type DashboardProjectGithubRepositoryProps = {
  id: number;
}

function DashboardProjectGithubRepository({id}: DashboardProjectGithubRepositoryProps){
  const repositoryData = useDashboardData().getRepositoryData(id);
  const repositoryRichData = useDashboardData().getRepositoryRichData(id);

  return <>
    <Stack direction={"row"} spacing={0.5} sx={{ alignItems: "baseline" }}>
      <RiGitRepositoryLine />
      <Typography>{repositoryData?.name}</Typography>
    </Stack>
    {repositoryRichData?.environments.map(env => {
      return <Stack direction={"row"} spacing={0.5} sx={{ alignItems: "baseline" }}>
        {env.status === 'success' ? <RiCheckboxCircleLine color="#2e7d32" /> : <FaRegCircleQuestion />}
        <Typography>{env.name}</Typography>
      </Stack>
    })}
  </>;
}

export default DashboardProjectGithubRepository;