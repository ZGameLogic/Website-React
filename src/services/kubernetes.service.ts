'use server';

import * as k8s from '@kubernetes/client-node';

function toBytes(value: string): number {
  const match = value.trim().match(/^(\d+(?:\.\d+)?)(Ki|Mi|Gi|Ti)?$/);
  if (!match) throw new Error(`Invalid size: ${value}`);

  return Number(match[1]) * 1024 ** ['', 'Ki', 'Mi', 'Gi', 'Ti'].indexOf(match[2] ?? '');
}

export async function getNodes(){
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
  const appsApi = kc.makeApiClient(k8s.AppsV1Api);
  const res = await k8sApi.listNode();
  const metricsApi = kc.makeApiClient(k8s.CustomObjectsApi);
  const [metricsResponse, deployments, pods] = await Promise.all([
    metricsApi.listClusterCustomObject({
      group: 'metrics.k8s.io',
      version: 'v1beta1',
      plural: 'nodes',
    }),
    appsApi.listNamespacedDeployment({ namespace: 'production' }),
    k8sApi.listNamespacedPod({ namespace: 'production' }),
  ]);
  const metrics = metricsResponse as {
    items: Array<{ metadata: { name: string }; usage: { memory: string } }>;
  };

  const data = metrics.items.map(item => {
    const name = item.metadata.name;
    const node = res.items.find(n => n.metadata?.name === name);
    const readyStatus = node?.status?.conditions?.some(cond => cond.type === 'Ready' && cond.status === 'True');
    const memoryUsage = toBytes(item.usage.memory);
    const totalMem = toBytes(node?.status?.allocatable?.memory ?? '');
    const memPerc = memoryUsage / totalMem;
    const nodePods = pods.items.filter(pod => pod.spec?.nodeName === name);
    const nodeDeployments = deployments.items.flatMap(deployment => {
      const selector = deployment.spec?.selector;
      if (!selector) return [];

      const deploymentPods = nodePods.filter(pod => {
        const labels = pod.metadata?.labels ?? {};
        const matchesLabels = Object.entries(selector.matchLabels ?? {})
          .every(([key, value]) => labels[key] === value);
        const matchesExpressions = (selector.matchExpressions ?? []).every(({ key, operator, values = [] }) => {
          const hasKey = Object.prototype.hasOwnProperty.call(labels, key);
          const value = labels[key];

          switch (operator) {
            case 'In':
              return hasKey && values.includes(value);
            case 'NotIn':
              return !hasKey || !values.includes(value);
            case 'Exists':
              return hasKey;
            case 'DoesNotExist':
              return !hasKey;
            default:
              return false;
          }
        });

        return matchesLabels && matchesExpressions;
      });

      if (deploymentPods.length === 0) return [];

      const podStatuses = deploymentPods.reduce<Record<string, number>>((statuses, pod) => {
        const status = pod.status?.phase ?? 'Unknown';
        statuses[status] = (statuses[status] ?? 0) + 1;
        return statuses;
      }, {});

      return [{
        name: deployment.metadata?.name,
        podCount: deploymentPods.length,
        podStatuses,
        pods: deploymentPods.map(pod => {
          const containerStatuses = pod.status?.containerStatuses ?? [];
          return {
            name: pod.metadata?.name,
            status: pod.status?.phase ?? 'Unknown',
            ready: containerStatuses.length > 0 && containerStatuses.every(container => container.ready),
            restartCount: containerStatuses.reduce((total, container) => total + container.restartCount, 0),
          };
        }),
      }];
    });

    return {
      name,
      memoryPercentage: memPerc,
      created: node?.metadata?.creationTimestamp,
      readyStatus,
      deployments: nodeDeployments,
    }
  });
  return data;
}
