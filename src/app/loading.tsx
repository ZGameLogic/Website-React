import {CircularProgress, Stack, Typography} from '@mui/material';

export default function Loading(){
  return <Stack spacing={2} sx={{py: 8}}>
    <CircularProgress />
    <Typography>Loading projects...</Typography>
  </Stack>
}