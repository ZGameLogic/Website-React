'use client';

import {Background, NodeChange, ReactFlow, applyNodeChanges} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {useCallback, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import KubernetesNode from '@/src/app/architecture/kubernetes-node-component.tsx';

export default function ArchitecturePage() {
  const nodeTypes = {
    kubernetesNode: KubernetesNode
  };
  const initialNodes = [
    {id: 'n1', position: {x: 0, y: 0}, data: {label: 'Node 1'}},
    {id: 'n2', position: {x: 0, y: 100}, data: {label: 'Node 2'}},
    {id: 'n3', type: 'kubernetesNode', position: {x: 0, y: 100}, data: [
        {label: 'master', doid: 0},
        {label: 'pi1', doid: 1},
        {label: 'pi2', doid: 2},
        {label: 'pi3', doid: 3},
        {label: 'pi4', doid: 4},
    ]},
  ];
  const initialEdges = [
    {id: 'n1-n2', source: 'n1', target: 'n2'},
    {id: 'n2-n3', source: 'n2', target: 'n3'}
  ];

  const theme = useTheme();
  const [nodes, setNodes] = useState(initialNodes);
  const onNodesChange = useCallback((changes: NodeChange<{ id: string; position: { x: number; y: number; }; data: { label: string; }; }>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []);

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
