import {AppBar, Button, Divider, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router";

function AppHeader() {
  return <AppBar position={'static'} >
    <Toolbar>
      <Typography sx={{ marginRight: 2 }} variant={'h4'}>Ben Shabowski</Typography>
      <Divider orientation={'vertical'} flexItem sx={{ marginRight: 2 }} />
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
        to={'/aboutme'}>
        About Me
      </Button>
    </Toolbar>
  </AppBar>
}

export default AppHeader;