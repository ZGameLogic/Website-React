import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from "@mui/material";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {useDashboardData} from "../global/dashboard data/useDashboardData.ts";

type Inputs = {
  name: string;
  description: string;
  aspects: string[];
}

/*
TODO create selects for DataOtter, GithubRepos, GithubProjects and additional aspects
 */
function CreateProjectDialog({open, setOpen}: {open: boolean, setOpen: (val: boolean) => void}) {
  const { refreshDashboardData } = useDashboardData();

  const { control, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/dashboard/projects`, {
      method: 'POST',
      headers: {
        'key': localStorage.getItem('key') || '',
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if(response.ok) {
        reset();
        refreshDashboardData();
        setOpen(false);
      }
    });
  };

  return <Dialog open={open} onClose={() => setOpen(false)}>
    <DialogTitle sx={{marginRight: 40}}>Creat New Project</DialogTitle>
    <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)} id={'create-project'}>
        <Stack spacing={2}>
          <Controller name="name" control={control} render={({ field }) =>
            <TextField
              label={'Project Name'}
              {...field}
              fullWidth={true}
            />
          }/>
          <Controller name="description" control={control} render={({ field }) =>
            <TextField
              multiline
              minRows={3}
              label={'Project Description'}
              {...field}
            />
          }/>
        </Stack>
      </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => {
        reset();
        setOpen(false);
      }}>Cancel</Button>
      <Button type="submit" form="create-project">Create</Button>
    </DialogActions>
  </Dialog>;
}

export default CreateProjectDialog;