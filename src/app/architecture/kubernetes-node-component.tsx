import {Card, CardContent, Typography} from '@mui/material';
import {Handle, Position} from '@xyflow/react';

type KubernetesNodeDataType = {
  label: string;
  doid: string;
}

type KubernetesNodeProps = {
  data: KubernetesNodeDataType[];
  isConnectable: boolean;
}

export default function KubernetesNode({ data, isConnectable }: KubernetesNodeProps) {
  return <Card variant={'outlined'}>
    <CardContent>
      <Typography variant={'h6'}>Kubernetes Cluster</Typography>
      { data.map(line => <Typography sx={{ fontSize: 10 }} key={line.doid}>{line.label}</Typography>)}
    </CardContent>
    <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
  </Card>;
};
