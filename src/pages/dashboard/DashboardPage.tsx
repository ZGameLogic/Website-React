import DashboardProject from '../../components/DashboardProject';
import {Box} from "@mui/material";
import {useDashboardData} from "../../global/dashboard data/useDashboardData.ts";

function DashboardPage(){
    const {isInitialLoading, dashboardProjects} = useDashboardData();

    return isInitialLoading ? <h1>Loading...</h1> : <Box>
        {dashboardProjects.map(project => <DashboardProject projectId={project.id} key={project.id}/> )}
    </Box>;
}

export default DashboardPage;