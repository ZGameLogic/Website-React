import {AppBar, Button, Divider, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router";

function AppHeader() {
  return <AppBar position={'static'} >
    <Toolbar>
      <Typography sx={{ marginRight: 5 }} variant={'h4'}>Ben Shabowski</Typography>
      <Divider orientation={'vertical'} flexItem sx={{ marginRight: 5 }} />
      <Button
        sx={{ borderRadius: 0, '&.active': { borderBottom: '2px solid white' } }}
        color={'inherit'}
        component={NavLink}
        to={'/'}>
        Project Dashboard
      </Button>
      <Button
        sx={{ borderRadius: 0, '&.active': { borderBottom: '2px solid white' } }}
        color={'inherit'}
        component={NavLink}
        to={'/admin'}>
        Admin Page
      </Button>
    </Toolbar>
  </AppBar>
}

export default AppHeader;