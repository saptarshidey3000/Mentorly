import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";





export default function Roadmap({roadmapData}) {

  const generateNodesAndEdges = (data) => {
  const nodes = [];
  const edges = [];

  data.forEach((item, index) => {
    const id = `node-${index}`;
    const nextId = `node-${index + 1}`;

    nodes.push({
      id,
      data: {
        label: `${item.topic}\n(Week ${item.week}, Day ${item.day})`,
      },
      position: { x: index * 250, y: item.week * 120 },
      style: {
        padding: 10,
        borderRadius: 10,
        background: "#ffffff",
        border: "1px solid #c623eb",
        fontSize: 13,
        whiteSpace: "pre-line",
      },
    });

    if (index < data.length - 1) {
      edges.push({
        id: `e-${id}-${nextId}`,
        source: id,
        target: nextId,
        animated: true,
        type: "smoothstep",
      });
    }
  });

  return { nodes, edges };
};

  const { nodes, edges } = useMemo(
    () => generateNodesAndEdges(roadmapData),
    []
  );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        panOnScroll
        zoomOnScroll
        snapToGrid
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
