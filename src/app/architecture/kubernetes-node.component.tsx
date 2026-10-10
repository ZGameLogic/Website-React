'use client';

import {Card, CardContent, Typography, Stack} from '@mui/material';
import {Handle, Position} from '@xyflow/react';
import KubernetesLineItem from '@/src/app/architecture/kubernetes-line-item.component.tsx';
import {useCallback} from 'react';
import {useGlobalData} from "@/src/global/global-data.hook.ts";

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
  const { dataOtter } = useGlobalData();

  const getStatus = useCallback((id: number) => {
    const status = dataOtter.deviceStatuses.find(l => l.id === id);
    if(status === undefined) return undefined;
    return status.status !== undefined;
  }, [dataOtter]);

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
