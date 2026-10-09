import {Handle, Position} from '@xyflow/react';
import {Card, Typography} from '@mui/material';

export type EndNodeData = {
  label: string;
};

export default function EndNode({ data }: { data: EndNodeData }){
  return <>
    <Handle type={'target'} position={Position.Left} />
    <Card variant={'outlined'} sx={{
      width: 120,
      height: 25,
      justifyContent: 'center'
    }}>
      <Typography sx={{ textAlign: 'center'}}>{data.label}</Typography>
    </Card>
  </>
}