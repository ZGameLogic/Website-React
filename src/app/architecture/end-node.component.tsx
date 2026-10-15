import {Handle, Position} from '@xyflow/react';
import {Card, Stack, Typography} from '@mui/material';
import { CiServer } from 'react-icons/ci';
import {FaCubes} from 'react-icons/fa';
import {GoDatabase} from 'react-icons/go';

export type EndNodeData = {
  icon: 'service' | 'computer' | 'database' | 'none';
  label: string;
};

export default function EndNode({ data }: { data: EndNodeData }){
  const iconProps = {
    size: 12
  }
  const icon =  {
    computer: <CiServer {...iconProps} />,
    service: <FaCubes {...iconProps} />,
    database: <GoDatabase {...iconProps} />,
    none: <></>
  }[data.icon] ?? <></>;

  return <>
    <Handle type={'target'} position={Position.Left} />
    <Card variant={'outlined'} sx={{
      width: 120,
      height: 25,
      justifyContent: 'center'
    }}>
      <Stack direction={'row'} sx={{alignItems: 'center', pl: 1}} spacing={1}>
        {icon}
        <Typography sx={{ textAlign: 'center'}}>{data.label}</Typography>
      </Stack>
    </Card>
  </>
}