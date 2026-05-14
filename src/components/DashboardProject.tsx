import {useDashboardData} from "../global/dashboard data/useDashboardData.ts";
import {Box, Button, Card, CardContent, Chip, Divider, Stack, Typography} from "@mui/material";
import DashboardProjectGithubRepository from "./DashboardProjectGithubRepository.tsx";
import {useMemo} from "react";
import { FaJava, FaDocker, FaReact } from "react-icons/fa";
import { SiSpring, SiGodotengine, SiLua, SiApachemaven } from "react-icons/si";
import { GrHtml5 } from "react-icons/gr";
import { AiOutlineKubernetes } from "react-icons/ai";
import { TbBrandTypescript } from "react-icons/tb";
import { RiJavascriptLine } from "react-icons/ri";
import { LiaSwift } from "react-icons/lia";
import DashboardProjectGithubProject from "./DashboardProjectGithubProject.tsx";

type DashboardProjectProps = {
  projectId: string;
}

function DashboardProject({projectId}: DashboardProjectProps) {
  const {getDashboardProject, getRepositoryRichData, getMonitorRichData, getGithubProjectData} = useDashboardData();
  const project = getDashboardProject(projectId);
  const monitorsStatus = useMemo(() => (project?.dataOtterProjectLinks
    .map(link => getMonitorRichData(link))
    .filter(m => m !== undefined) ?? [])
    .reduce((acc, monitor) => acc && monitor.status, true)
    , [project, getMonitorRichData]);
  const projectLanguages = useMemo(() => {
    if (!project) return [];

    const repoLanguages = project.githubRepositoryLinks
      .map(link => getRepositoryRichData(link))
      .flatMap(data => Object.keys(data?.languages ?? {}));

    return [...new Set([...repoLanguages, ...project.additionalAspects])];
  }, [project, getRepositoryRichData]);
  const projectGithubProjects = useMemo(() => {
    if(!project) return [];
    return project.githubProjectLinks.map(link => getGithubProjectData(link))
      .filter(p => p !== undefined);

  }, [project, getGithubProjectData]);

  if(!project) return <></>;

  return <Card sx={{ maxWidth: 345 }}>
    <CardContent>
      <Typography variant="h5">{project.name}</Typography>
      <Typography>{project.description}</Typography>
      {project.dataOtterProjectLinks.length > 0 && <>
          <Divider textAlign="left">
              <Typography sx={{
                color: 'text.secondary',
                fontSize: '0.68rem'
              }}>Data Otter Monitors</Typography>
          </Divider>
          <Stack direction={'row'} sx={{alignItems: 'center'}}>
            <Typography sx={{marginRight: 1}}>Monitor Status:</Typography>
            <Chip
              size={'small'}
              color={monitorsStatus ? 'success' : 'error'}
              variant={'outlined'}
              label={monitorsStatus ? 'Up' : 'Down'}
            />
          </Stack>
        </>
      }
      {project.githubProjectLinks.length > 0 && projectGithubProjects.length > 0 &&
        <>
          <Divider textAlign="left">
            <Typography sx={{
              color: 'text.secondary',
              fontSize: '0.68rem'
            }}>GitHub Projects</Typography>
          </Divider>
          <Box sx={{marginY: 1}}>
            {project.githubProjectLinks.map(link => <DashboardProjectGithubProject id={link} key={link} />)}
          </Box>
        </>
      }
      {project.githubRepositoryLinks.length > 0 && <Divider textAlign="left">
        <Typography sx={{
          color: 'text.secondary',
          fontSize: '0.68rem'
        }}>GitHub Repositories</Typography>
      </Divider>}
      <Box sx={{marginY: 1}}>
        {project.githubRepositoryLinks.map(link => <DashboardProjectGithubRepository id={link} key={link} />)}
      </Box>
      <Box sx={{marginBottom: 1}}>
        {project.mavenUrls.length > 0 && <Divider textAlign="left">
            <Typography sx={{
              color: 'text.secondary',
              fontSize: '0.68rem'
            }}>Maven Repository Links</Typography>
        </Divider>}
        {project.mavenUrls.map(url =>
          <Button
            startIcon={<SiApachemaven />}
            variant={'outlined'}
            href={url}
            target="_blank"
          >Maven Repository Link</Button>
        )}
      </Box>
      {projectLanguages.length > 0 && <Divider textAlign="left">
        <Typography sx={{
          color: 'text.secondary',
          fontSize: '0.68rem'
        }}>Project Languages/Frameworks</Typography>
      </Divider>}
      {projectLanguages.map(language => {
        switch(language){
          case "Java": return <FaJava />
          case "Spring": return <SiSpring />;
          case "HTML": return <GrHtml5 />;
          case "Dockerfile": return <FaDocker />;
          case "Kubernetes": return <AiOutlineKubernetes />;
          case "TypeScript": return <TbBrandTypescript />;
          case "JavaScript": return <RiJavascriptLine />;
          case "Swift": return <LiaSwift />;
          case "Lua": return <SiLua />;
          case "GDScript": return <SiGodotengine />;
          case "Maven": return <SiApachemaven />;
          case "React": return <FaReact />;
          default: return <></>;
        }
      })}
    </CardContent>
  </Card>;
}

export default DashboardProject;