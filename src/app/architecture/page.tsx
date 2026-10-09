'use client';

import {Background, NodeChange, ReactFlow, applyNodeChanges, type Node, Position} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {useCallback, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import KubernetesNode, {KubernetesNodeData} from '@/src/app/architecture/kubernetes-node.component.tsx';
import EndNode, {EndNodeData} from '@/src/app/architecture/end-node.component.tsx';

type ArchitectureNode =
  | Node<KubernetesNodeData, 'kubernetesNode'>
  | Node<EndNodeData, 'endNode'>
  | Node<{ label: string }, 'default'>;

export default function ArchitecturePage() {
  const nodeTypes = {
    kubernetesNode: KubernetesNode,
    endNode: EndNode
  };
  const applications = [
    'Discord Bot',
    'Wraith',
    'Oni',
    'Golem',
    'Cobble',
    'Postgres'
  ];
  const initialNodes: ArchitectureNode[] = [
    {
      id: 'k3s',
      type: 'kubernetesNode',
      position: { x: 0, y: 0 },
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
    ...applications.map((app, index): ArchitectureNode => ({
      id: `n${index}`,
      type: 'endNode',
      position: { x: 300, y: (index * 50) - (applications.length * 25) + 0.5 * 225 },
      connectable: false,
      targetPosition: Position.Left,
      sourcePosition: undefined,
      data: { label: app },
    }))
  ];

  const initialEdges = applications.map((_app, index) => ({
    id: `k3s-n${index}`, source: 'k3s', target: `n${index}`, type: 'smoothstep', animated: true
  }))

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
