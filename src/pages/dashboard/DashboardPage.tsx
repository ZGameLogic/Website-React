import DashboardProject from '../../components/DashboardProject';
import {useDashboardData} from "../../global/DashboardData";
import {Box} from "@mui/material";

function DashboardPage(){
    const {isInitialLoading, dashboardProjects} = useDashboardData();

    return isInitialLoading ? <h1>Loading...</h1> : <Box>
        {dashboardProjects.map(project => <DashboardProject projectId={project.id} key={project.id}/> )}
    </Box>;
}

export default DashboardPage;