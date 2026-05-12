import {useDashboardData} from "../global/dashboard data/useDashboardData.ts";
import {Box, Card, CardContent, Typography} from "@mui/material";
import DashboardProjectGithubRepository from "./DashboardProjectGithubRepository.tsx";
import {useEffect, useMemo} from "react";
import { FaJava, FaDocker } from "react-icons/fa";
import { SiSpring, SiGodotengine, SiLua } from "react-icons/si";
import { GrHtml5 } from "react-icons/gr";
import { AiOutlineKubernetes } from "react-icons/ai";
import { TbBrandTypescript } from "react-icons/tb";
import { RiJavascriptLine } from "react-icons/ri";
import { LiaSwift } from "react-icons/lia";

type DashboardProjectProps = {
    projectId: string;
}

function DashboardProject({projectId}: DashboardProjectProps) {
    const {getDashboardProject, getRepositoryRichData} = useDashboardData();
    const project = getDashboardProject(projectId);
    const projectLanguages = useMemo(() => {
        if (!project) return [];

        const repoLanguages = project.githubRepositoryLinks
            .map(link => getRepositoryRichData(link))
            .flatMap(data => Object.keys(data?.languages ?? {}));

        return [...new Set([...repoLanguages, ...project.additionalAspects])];
    }, [project, getRepositoryRichData]);

    useEffect(() => console.log(projectLanguages), [projectLanguages]);

    if(!project) return <></>;

    return <Card sx={{ maxWidth: 345 }}>
        <CardContent>
            <Typography variant="h5">{project.name}</Typography>
            <Typography>{project.description}</Typography>
            <Box sx={{marginY: 1}}>
                {project.githubRepositoryLinks.map(link => <DashboardProjectGithubRepository id={link} key={link} />)}
            </Box>
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
                    default: return <></>;
                }
            })}
        </CardContent>
    </Card>;
}

export default DashboardProject;