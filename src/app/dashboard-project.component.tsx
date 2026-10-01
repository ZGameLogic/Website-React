import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import {findAllDashboardProjects} from '@/src/services/database.service.ts';
import {ReactElement, Suspense} from 'react';
import {DashboardProjectProject} from '@/src/app/dashboard-project-project.component.tsx';
import {getRepositoryLanguages, GithubRepository} from '@/src/services/github.service.ts';
import {DashboardProjectRepository} from '@/src/app/dashboard-project-repository.component.tsx';
import {RiGitRepositoryLine, RiJavascriptLine, RiNextjsLine} from 'react-icons/ri';
import {FaDocker, FaJava, FaReact} from 'react-icons/fa';
import {SiApachemaven, SiGodotengine, SiKubernetes, SiLua, SiPostgresql, SiSpring} from 'react-icons/si';
import {GrHtml5, GrMysql} from 'react-icons/gr';
import {TbBrandTypescript, TbFileTypeCss} from 'react-icons/tb';
import {LiaSwift} from 'react-icons/lia';
import {HiH2} from 'react-icons/hi2';
import {getDataOtterApplication} from '@/src/services/dataotter.service.ts';

type DashboardProjectProps = {
  project: Awaited<ReturnType<typeof findAllDashboardProjects>>[number];
  githubRepositories: GithubRepository[];
}

export async function DashboardProject({project, githubRepositories}: DashboardProjectProps){
  const LANGUAGE_SIZE = 23;
  const languageArrays = await Promise.all(
    githubRepositories.map(repo => getRepositoryLanguages(repo))
  );
  const languages = [...new Set(languageArrays.flat()), ...project.additionalProjectAspects.map(apa => apa.aspect)];
  const monitorStatus = project.dataotterApplicationLinks.length > 0 ?
    await getDataOtterApplication(Number(project.dataotterApplicationLinks[0].applicationId)) : undefined;


  const IconTooltip = ({tooltip, icon}: {
    tooltip: string;
    icon: ReactElement;
  }) => {
    return <Tooltip title={tooltip} arrow>
      {icon}
    </Tooltip>;
  }

  return <Card>
    <CardContent>
      <Typography variant={'h5'}>{project.name}</Typography>
      <Typography>{project.description}</Typography>
      { project.dataotterApplicationLinks.length > 0 && <>
        <Divider textAlign={'left'}>
          <Typography sx={{
            color: 'text.secondary',
            fontSize: '0.68rem'
          }}>Data Otter Monitors</Typography>
        </Divider>
        <Stack direction={'row'} sx={{alignItems: 'center'}}>
          <Typography sx={{marginRight: 1}}>Monitor Status:</Typography>
          <Chip
            size={'small'}
            color={monitorStatus!.status ? 'success' : 'error'}
            variant={'outlined'}
            label={monitorStatus!.status ? 'Up' : 'Down'}
          />
        </Stack>
      </>}
      { project.githubProjectLinks.length > 0 && <>
      <Divider textAlign={'left'}>
          <Typography sx={{
            color: 'text.secondary',
            fontSize: '0.68rem'
          }}>Github Projects</Typography>
        </Divider>
        <Box sx={{marginY: 1}}>
          {project.githubProjectLinks.map(link => <Suspense fallback={<Typography>Loading</Typography>} key={link.githubProjectId}>
              <DashboardProjectProject id={link.githubProjectId ?? BigInt(0)} />
            </Suspense>
          )}
        </Box>
      </>
      }
      { project.githubRepositoryLinks.length > 0 && <>
      <Divider textAlign={'left'}>
          <Typography sx={{
            color: 'text.secondary',
            fontSize: '0.68rem'
          }}>Github Repositories</Typography>
      </Divider>
      <Box sx={{marginY: 1}}>
        {githubRepositories.map(repo => {
          return <Suspense key={repo.id} fallback={<>
            <Box
              sx={{
                p: 1.25,
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Stack direction='row' spacing={1} sx={{alignItems: 'center'}}>
                  <Tooltip title={'GitHub Repository'} arrow>
                    <RiGitRepositoryLine />
                  </Tooltip>
                  <CircularProgress size={20} />
                  <Typography>Loading Repository...</Typography>
                </Stack>
              </Box>
            </Box>
          </>}>
            <DashboardProjectRepository githubRepository={repo}/>
          </Suspense>
        })}
      </Box>
      </>
      }
      <Box sx={{marginBottom: 1}}>
        {project.mavenProjectLinks.length > 0 && <Divider textAlign="left">
            <Typography sx={{
              color: 'text.secondary',
              fontSize: '0.68rem'
            }}>Maven Repository Links</Typography>
        </Divider>}
        {project.mavenProjectLinks.map(url =>
          <Button
            key={url.mavenUrl}
            startIcon={<SiApachemaven />}
            variant={'outlined'}
            href={url.mavenUrl ?? ''}
            target='_blank'
          >Maven Repository Link</Button>
        )}
      </Box>
      <Divider textAlign={'left'}>
        <Typography sx={{
          color: 'text.secondary',
          fontSize: '0.68rem'
        }}>Project Languages/Frameworks</Typography>
      </Divider>
      {languages.map(language => {
        switch(language){
          case 'Java': return <IconTooltip key={0} tooltip={'Java'} icon={<FaJava size={LANGUAGE_SIZE} />} />;
          case 'Spring': return <IconTooltip key={1} tooltip={'Spring'} icon={<SiSpring size={LANGUAGE_SIZE} />} />;
          case 'HTML': return <IconTooltip key={2} tooltip={'HTML'} icon={<GrHtml5 size={LANGUAGE_SIZE} />} />;
          case 'Dockerfile': return <IconTooltip key={3} tooltip={'Docker'} icon={<FaDocker size={LANGUAGE_SIZE} />} />;
          case 'Kubernetes': return <IconTooltip key={4} tooltip={'Kubernetes'} icon={<SiKubernetes size={LANGUAGE_SIZE} />} />;
          case 'TypeScript': return <IconTooltip key={5} tooltip={'TypeScript'} icon={<TbBrandTypescript size={LANGUAGE_SIZE} />} />;
          case 'JavaScript': return <IconTooltip key={6} tooltip={'JavaScript'} icon={<RiJavascriptLine size={LANGUAGE_SIZE} />} />;
          case 'Swift': return <IconTooltip key={7} tooltip={'Swift'} icon={<LiaSwift size={LANGUAGE_SIZE} />} />;
          case 'Lua': return <IconTooltip key={8} tooltip={'Lua'} icon={<SiLua size={LANGUAGE_SIZE} />} />;
          case 'GDScript': return <IconTooltip key={9} tooltip={'GDScript'} icon={<SiGodotengine size={LANGUAGE_SIZE} />} />;
          case 'Maven': return <IconTooltip key={10} tooltip={'Maven'} icon={<SiApachemaven size={LANGUAGE_SIZE} />} />;
          case 'React': return <IconTooltip key={11} tooltip={'React'} icon={<FaReact size={LANGUAGE_SIZE} />} />;
          case 'Mysql': return <IconTooltip key={12} tooltip={'MySQL'} icon={<GrMysql size={LANGUAGE_SIZE} />} />;
          case 'Postgres': return <IconTooltip key={13} tooltip={'Postgres'} icon={<SiPostgresql size={LANGUAGE_SIZE} />} />;
          case 'H2': return <IconTooltip key={14} tooltip={'H2'} icon={<HiH2 size={LANGUAGE_SIZE} />} />;
          case 'NextJs': return <IconTooltip key={15} tooltip={'NextJS'} icon={<RiNextjsLine size={LANGUAGE_SIZE} />} />;
          case 'CSS': return <IconTooltip key={17} tooltip={'CSS'} icon={<TbFileTypeCss size={LANGUAGE_SIZE} />} />;
          default: return <div key={16}></div>;
        }
      })}
    </CardContent>
  </Card>
}