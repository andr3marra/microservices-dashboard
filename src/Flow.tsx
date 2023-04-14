import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  BackgroundVariant
} from "reactflow";
import ELK from 'elkjs/lib/elk.bundled.js'

import { usePrevious } from "./utils/hooks/usePrevious";

import { getData, pollData } from "./initialNodes"

import "reactflow/dist/style.css";
import ServiceNode from "./components/ServiceNode";

const elk = new ELK()

const nodeTypes = {
  service: ServiceNode
};

let initialNodes: Node[]; let initialEdges: Edge[];

const BasicFlow = () => {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const previousValues = usePrevious({ nodes, edges })
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);

  // Fetch the api response
  useEffect(() => {
    const fetchData = async () => {
      const data = await pollData();

      const [nodes, edges] = getData()

      // console.log("formatted nodes", nodes)
      // console.log("formatted edges", edges)
      setNodes(nodes)
      setEdges(edges)
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);

  }, []);

  // Called after each node or edge changes to generate the diagram layout automatically using Elkjs
  useEffect(() => {

    if (!nodes) return

    if (previousValues?.edges === edges || previousValues?.nodes === nodes) return

    const elkLayout = () => {
      const nodesForElk = nodes.map((node: Node) => {
        return {
          id: node.id,
          width: 220,
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
        edges: edges as any
      };
      return elk.layout(graph as any);
    };

    const nodesForFlow = (graph: any) => {
      return [
        ...graph.children.map((node: any) => {
          return {
            ...nodes.find((n) => n.id === node.id),
            position: { x: node.x, y: node.y }
          };
        })
      ];
    };

    const edgesForFlow = (graph: any) => {
      return graph.edges;
    };

    elkLayout().then((graph) => {
      setNodes(nodesForFlow(graph));
      setEdges(edgesForFlow(graph));
    });

  }, [nodes, edges]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  if (!nodes) {
    return <></>;
  }

  const onMouseEnter = (event: React.MouseEvent, node: Node) => {
    console.log("onMouseEnter");
    event.preventDefault();
    setPosition({ x: event.clientX, y: event.clientY })
    setIsOpen(true);

    console.log(node);


    // nodes.forEach(function (node) {
    //   if(node.data.tags != null && (node.data.tags as string[]).includes("City")){
    //     node.hidden = true;
    //     console.log("setting to hidden")
    //   }
    // });
    // setNodes(nodes)
    // setEdges(edges)
  };

  const onMouseLeave = (event: React.MouseEvent, node: Node) => {
    console.log("onMouseLeave");
    event.preventDefault();
    setIsOpen(false);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      // fitView = {true}  // NOT WORKING
      onNodeContextMenu={(event: React.MouseEvent, node: Node) => { }}
      onNodeMouseEnter={onMouseEnter}
      onNodeMouseLeave={onMouseLeave}
    >
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />



      {isOpen && (
        <div style={{ overflow: 'hidden', position: 'fixed', top: 0, width: '100%' }}>
          <a href="#home">Home</a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
        </div>
      )
      }

    </ReactFlow>


  );
};
//https://reactflow.dev/docs/examples/nodes/dynamic-grouping/

export default BasicFlow;


// TODO: Set node visibility based on tags using a toolbar
// TODO: Create colapse function for nodes
// TODO: Implement on backend node grouping 