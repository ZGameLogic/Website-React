'use client';

import {Background, NodeChange, ReactFlow, applyNodeChanges} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {useCallback, useState} from 'react';
import {useTheme} from '@mui/material/styles';

export default function ArchitecturePage() {
  const initialNodes = [
    {id: 'n1', position: {x: 0, y: 0}, data: {label: 'Node 1'}},
    {id: 'n2', position: {x: 0, y: 100}, data: {label: 'Node 2'}},
  ];
  const initialEdges = [{id: 'n1-n2', source: 'n1', target: 'n2'}];

  const theme = useTheme();
  const [nodes, setNodes] = useState(initialNodes);
  const onNodesChange = useCallback((changes: NodeChange<{ id: string; position: { x: number; y: number; }; data: { label: string; }; }>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []);

  return <div style={{ width: '100vw', height: '91vh', justifyContent: 'center' }}>
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={initialEdges}
      fitView
      colorMode={theme.palette.mode}
    >
      <Background />
    </ReactFlow>
  </div>;
}
