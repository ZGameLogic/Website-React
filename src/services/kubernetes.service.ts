'use server';

import * as k8s from '@kubernetes/client-node';
import { createConfiguration, CoreV1Api } from '@kubernetes/client-node';
import type { CoreV1ApiReadNodeStatusRequest } from '@kubernetes/client-node';


function toBytes(value: string): number {
  const match = value.trim().match(/^(\d+(?:\.\d+)?)(Ki|Mi|Gi|Ti)?$/);
  if (!match) throw new Error(`Invalid size: ${value}`);

  return Number(match[1]) * 1024 ** ['', 'Ki', 'Mi', 'Gi', 'Ti'].indexOf(match[2] ?? '');
}

export async function getNodes(){
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
  const res = await k8sApi.listNode();

  const metricsApi = kc.makeApiClient(k8s.CustomObjectsApi);
  const metrics = await metricsApi.listClusterCustomObject({
    group: 'metrics.k8s.io',
    version: 'v1beta1',
    plural: 'nodes',
  });
  metrics.items.forEach(item => {
    const name = item.metadata.name;
    const memoryUsage = toBytes(item.usage.memory);
    const totalMem = toBytes(res.items.find(item => item.metadata.name === name)?.status?.allocatable.memory);
    const memPerc = memoryUsage / totalMem;

    console.log(name, memPerc);
  });

  // res.items.forEach(item => {
  //   const name = item.metadata?.name;
  //   const creationTimestamp = item.metadata?.creationTimestamp;
  //
  //   const totalMem = toBytes(item.status?.capacity['ephemeral-storage']);
  //   const usedMem = toBytes(item.status?.capacity?.memory);
  //   const memPerc = totalMem / usedMem;
  //   console.log(name, item);
  // })
  return 'done';
}
