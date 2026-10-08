'use client';

import {Background, NodeChange, ReactFlow, applyNodeChanges, type Node} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {useCallback, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import KubernetesNode, {KubernetesNodeData} from '@/src/app/architecture/kubernetes-node.component.tsx';

type ArchitectureNode =
  | Node<KubernetesNodeData, 'kubernetesNode'>
  | Node<{ label: string }, 'default'>;

export default function ArchitecturePage() {
  const nodeTypes = {
    kubernetesNode: KubernetesNode
  };
  const initialNodes: ArchitectureNode[] = [
    {
      id: 'k3s',
      type: 'kubernetesNode',
      position: { x: 0, y: 100 },
      data: {
        items: [
          { label: 'master', doid: 2 },
          { label: 'pi1', doid: 1 },
          { label: 'pi2', doid: 3 },
          { label: 'pi3', doid: 4 },
          { label: 'pi4', doid: 5 },
        ]
      }
    },
    {
      id: 'n1',
      type: 'default',
      position: { x: 0, y: 0 },
      data: { label: 'Node 1' }
    }
  ];
  const initialEdges = [
    { id: 'k3s-n1', source: 'k3s', target: 'n1', type: 'smoothstep', animated: true }
  ];

  const theme = useTheme();
  const [nodes, setNodes] = useState<ArchitectureNode[]>(initialNodes);
  const onNodesChange = useCallback((changes: NodeChange<ArchitectureNode>[]) => {
    setNodes(currentNodes => applyNodeChanges(changes, currentNodes));
  }, []);
  return <div style={{ width: '100vw', height: '91vh', justifyContent: 'center' }}>
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={initialEdges}
      fitView
      colorMode={theme.palette.mode}
    >
      <Background />
    </ReactFlow>
  </div>;
}
