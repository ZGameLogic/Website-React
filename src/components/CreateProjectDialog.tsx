import {
  Autocomplete,
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
import type {GitHubNameId, GitHubOptionId} from "../GlobalTypes.ts";
import {useEffect, useState} from "react";

type Inputs = {
  name: string;
  description: string;
  aspects: string[];
  githubProjectIds: number[];
  githubRepoIds: number[];
}

function CreateProjectDialog({open, setOpen}: {open: boolean, setOpen: (val: boolean) => void}) {
  const { refreshDashboardData } = useDashboardData();
  const [githubRepos, setGithubRepos] = useState<GitHubNameId[]>([]);
  const [githubProjects, setGithubProjects] = useState<GitHubNameId[]>([]);
  const [githubAspects, setGithubAspects] = useState<GitHubOptionId[]>([]);

  /*
  TODO maven repo links, dataotter monitors
   */

  const { control, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      name: '',
      description: '',
      aspects: [],
      githubProjectIds: [],
      githubRepoIds: []
    }
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/dashboard/github-repositories`)
      .then(res => res.json())
      .then(data => setGithubRepos(data));

    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/dashboard/github-projects`)
      .then(res => res.json())
      .then(data => setGithubProjects(data));

    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/dashboard/github-aspects`)
      .then(res => res.json())
      .then(data => setGithubAspects(data));
  }, []);

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
          <Controller name='githubRepoIds' control={control} render={({field}) =>
            <Autocomplete
              multiple
              options={githubRepos}
              getOptionLabel={(option) => option.name}
              getOptionKey={(option) => option.id}
              value={githubRepos.filter(repo => field.value.includes(repo.id))}
              onChange={(_event, value) => field.onChange(value.map(v => v.id))}
              onBlur={field.onBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="GitHub Repositories"
                />
              )}
            />
          } />
          <Controller name='githubProjectIds' control={control} render={({field}) =>
            <Autocomplete
              multiple
              options={githubProjects}
              getOptionLabel={(option) => option.name}
              getOptionKey={(option) => option.id}
              value={githubProjects.filter(proj => field.value.includes(proj.id))}
              onChange={(_event, value) => field.onChange(value.map(v => v.id))}
              onBlur={field.onBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="GitHub Projects"
                />
              )}
            />
          } />
          <Controller
            name="aspects"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                freeSolo
                options={githubAspects}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.name
                }
                value={field.value}
                onChange={(_event, value) => {
                  field.onChange(
                    value.map((v) => (typeof v === "string" ? v : v.id))
                  );
                }}
                onBlur={field.onBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Additional Aspects"
                  />
                )}
              />
            )}
          />
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