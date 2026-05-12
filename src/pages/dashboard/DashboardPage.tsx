import DashboardProject from '../../components/DashboardProject';
import {Box} from "@mui/material";
import {useDashboardData} from "../../global/dashboard data/useDashboardData.ts";

function DashboardPage(){
    const {isInitialLoading, dashboardProjects} = useDashboardData();

    return isInitialLoading ? <h1>Loading...</h1> : <Box
        sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            padding: 1,
            alignItems: "flex-start",
        }}
    >
        {dashboardProjects.map(project => (
            <DashboardProject projectId={project.id} key={project.id} />
        ))}
    </Box>;
}

export default DashboardPage;