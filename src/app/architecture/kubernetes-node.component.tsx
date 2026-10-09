'use client';

import {Card, CardContent, Typography, Stack} from '@mui/material';
import {Handle, Position} from '@xyflow/react';
import KubernetesLineItem from '@/src/app/architecture/kubernetes-line-item.component.tsx';
import {DataOtterDeviceStatus, getDataOtterDevices} from '@/src/services/dataotter.service.ts';
import {useCallback, useEffect, useState} from 'react';

export type KubernetesNodeData = {
  items: KubernetesNodeDataType[];
};

type KubernetesNodeDataType = {
  label: string;
  doid: number;
}

type KubernetesNodeProps = {
  data: KubernetesNodeData;
  isConnectable: boolean;
}

export default function KubernetesNode({ data, isConnectable }: KubernetesNodeProps) {
  const [statuses, setStatuses] = useState<DataOtterDeviceStatus[] | undefined>(undefined);

  useEffect(() => {
    getDataOtterDevices().then(setStatuses)
  }, []);

  const getStatus = useCallback((id: number) => {
    if(statuses === undefined) return undefined;
    return statuses.find(l => l.id === id) !== undefined;
  }, [statuses]);

  return <>
    <Card variant={'outlined'}>
      <CardContent>
        <Typography variant={'h6'}>Kubernetes Cluster</Typography>
        <Stack spacing={1}>
          { data.items.map(line => <KubernetesLineItem key={line.doid} name={line.label} status={getStatus(line.doid)} />)}
        </Stack>
      </CardContent>
    </Card>
    <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
  </>
};
