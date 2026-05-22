import {AppBar, Box, Button, Divider, Toolbar, Typography} from "@mui/material";
import { IoIosAdd } from "react-icons/io";
import {NavLink} from "react-router";
import {useState} from "react";
import CreateProjectDialog from "./CreateProjectDialog.tsx";

function AppHeader() {
  const key = localStorage.getItem("key");
  const [open, setOpen] = useState(false);

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
        disabled={true}
        sx={{ borderRadius: 0, '&.active': { borderBottom: '2px solid white' } }}
        color={'inherit'}
        component={NavLink}
        to={'/aboutme'}>
        About Me
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      {key && <>
          <Button startIcon={<IoIosAdd />} onClick={() => setOpen(true)}>Create Project</Button>
          <CreateProjectDialog open={open} setOpen={setOpen} />
      </>}
    </Toolbar>
  </AppBar>
}

export default AppHeader;