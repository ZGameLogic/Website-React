import {useDashboardData} from "../global/dashboard data/useDashboardData.ts";
import {Card, CardContent, Typography} from "@mui/material";
import DashboardProjectGithubRepository from "./DashboardProjectGithubRepository.tsx";

type DashboardProjectProps = {
    projectId: string;
}

function DashboardProject({projectId}: DashboardProjectProps) {
    const {getDashboardProject} = useDashboardData();
    const project = getDashboardProject(projectId);

    if(!project) return <></>;

    return <Card sx={{ maxWidth: 345 }}>
        <CardContent>
            <Typography variant="h5">{project.name}</Typography>
            <Typography>{project.description}</Typography>
            {project.githubRepositoryLinks.map(link => <DashboardProjectGithubRepository id={link} />)}
        </CardContent>
    </Card>;
}

export default DashboardProject;