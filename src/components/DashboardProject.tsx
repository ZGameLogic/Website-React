import {useDashboardData} from "../global/DashboardData";

type DashboardProjectProps = {
    projectId: string;
}

function DashboardProject({projectId}: DashboardProjectProps) {
    const {getDashboardProject, getRepositoryData} = useDashboardData();
    const project = getDashboardProject(projectId);

    return <h1>{project.name}</h1>;
}

export default DashboardProject;