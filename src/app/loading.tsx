import {CircularProgress, Stack, Typography} from '@mui/material';

export default function Loading() {
  return (
    <Stack
      spacing={2}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <CircularProgress />
      <Typography>Loading projects...</Typography>
    </Stack>
  );
}