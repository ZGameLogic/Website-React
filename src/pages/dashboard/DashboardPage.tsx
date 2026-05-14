import DashboardProject from '../../components/DashboardProject';
import {Box} from "@mui/material";
import {useDashboardData} from "../../global/dashboard data/useDashboardData.ts";
import {Masonry} from "@mui/lab";

function DashboardPage(){
    const {isInitialLoading, dashboardProjects} = useDashboardData();

    return isInitialLoading ? <h1>Loading...</h1> : <Box
      sx={{
        width: '100%',
        gap: 2,
        padding: 1,
      }}
    >
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        spacing={2}
      >
        {dashboardProjects.map(project => (
            <DashboardProject projectId={project.id} key={project.id} />
        ))}
      </Masonry>
    </Box>;
}

export default DashboardPage;