import { useCallback, useEffect } from "react";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Position
} from "reactflow";

import {getData} from "./initialNodes"

import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";

import ELK from 'elkjs/lib/elk.bundled.js'

const elk = new ELK()

const nodeTypes = {
  custom: CustomNode
};

const [initialNodes, initialEdges] = getData();

const elkLayout = () => {
  const nodesForElk = initialNodes.map((node: Node) => {
    return {
      id: node.id,
      width: 200,
      height: 100
    };
  });
  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "RIGHT",
      "nodePlacement.strategy": "SIMPLE"
    }, children: nodesForElk,
    edges: initialEdges as any
  };
  return elk.layout(graph as any);
};

const BasicFlow = () => {
  const nodesForFlow = (graph: any) => {
    return [
      ...graph.children.map((node: any) => {
        return {
          ...initialNodes.find((n) => n.id === node.id),
          position: { x: node.x, y: node.y }
        };
      })
    ];
  };
  const edgesForFlow = (graph: any) => {
    return graph.edges;
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    elkLayout().then((graph) => {
      console.log(graph);
      setNodes(nodesForFlow(graph));
      setEdges(edgesForFlow(graph));
    });
  }, []);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  if (nodes === null) {
    return <></>;
  }
  
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <Background />
    </ReactFlow>
  );
};

export default BasicFlow;
