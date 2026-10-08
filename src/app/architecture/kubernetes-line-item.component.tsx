import {Paper, Stack, Typography} from '@mui/material';
import {SiRaspberrypi} from 'react-icons/si';

type KubernetesLineItemProps = {
  name: string;
  status: boolean | undefined;
}

export default function KubernetesLineItem({name, status}: KubernetesLineItemProps){
  const color = status === undefined ? '#444444' : (status ? '#4a9a25': '#a10d0d' );

  return <Paper sx={{ width: '50%', p: .25}}>
    <Stack direction={'row'} spacing={.5}>
      <SiRaspberrypi color={color}/>
      <Typography sx={{ fontSize: 10 }}>{name}</Typography>
    </Stack>
  </Paper>;
}
