import {
    Node,
    Edge,
    Position
} from "reactflow";

import { HealthStatus, ServiceState } from "./data";

const healthyEdgeStyle =
{
    animated: false,
    style: { stroke: "#27ae60" }
};

const degradedEdgeStyle =
{
    animated: true,
    label: HealthStatus[HealthStatus.Degraded],
    labelStyle: { fill: "#e67e22", fontWeight: 700 },
    style: { stroke: "#e67e22" }
};

const unhealtyEdgeStyle =
{
    animated: true,
    label: HealthStatus[HealthStatus.Unhealthy],
    labelStyle: { fill: "#d12121", fontWeight: 700 },
    style: { stroke: "#d12121" }
};

function getEdgeStyle(value: HealthStatus) {
    switch (value) {
        case HealthStatus.Healthy:
            return healthyEdgeStyle;
        case HealthStatus.Degraded:
            return degradedEdgeStyle;
        case HealthStatus.Unhealthy:
            return unhealtyEdgeStyle;
    }
}
let data: ServiceState[];

function getUsers(): Promise<ServiceState[]> {
    return fetch('https://localhost:7188/States')
        .then(res => res.json())
        .then(res => {
            return res as ServiceState[]
        })
}

let nodes: Node[];
let edges: Edge[];
const tagVisibility = new Map<string, boolean>();


export function getNodes() : Node[]{
    return nodes;
}

export function getEdges() : Edge[]{
    return edges;
}

export function getTags() : Map<string, boolean>{
    return tagVisibility;
}

export function changeVisibilityByNode(node : Node, value: boolean ){
    node.hidden = value;
    // TODO: hide all edges conecting to this node and all nodes conected to edges
}

export function changeVisibilityByTab(tag: string, value: boolean) {
    if (tagVisibility.has(tag)) {
        tagVisibility.set(tag, value);
    }
    [nodes, edges] = buildNodesAndEdges();
}

export function showAllItems(){
    nodes.forEach((node) => {
        node.hidden = false;
    })
    edges.forEach((edge) => {
        edge.hidden = false;
    })
}

export async function pollData() {
    data = await getUsers().then((value)=> data = value);
    buildTags();
    [nodes, edges] = buildNodesAndEdges();
}

export function buildTags() {
    data.forEach((serviceState: ServiceState) => {
        serviceState.tags?.forEach((tag) => {
            if (!tagVisibility.has(tag)) {
                tagVisibility.set(tag, true)
            }
        });
    });

}

export function buildNodesAndEdges(): [Node[], Edge[]] {
    const initialNodes: Node[] = [];
    const initialEdges: Edge[] = [];

    data.forEach((serviceState: ServiceState) => {
        // if (serviceState.parentId == null) {
        //     let groupNode = {
        //         id: serviceState.id + "group",
        //         type: "group",
        //         data: { label: serviceState.name, status: serviceState.healthStatus },
        //         position: { x: 0, y: 0 },
        //         sourcePosition: Position.Right,
        //         targetPosition: Position.Left
        //     } as Node;
    
        //     initialNodes.push(groupNode);
        // }

        let node = {
            id: serviceState.id,
            data: { label: serviceState.name, status: serviceState.healthStatus, tags: serviceState.tags },
            hidden: serviceState.tags?.some(x => tagVisibility.has(x)),
            position: { x: 0, y: 0 },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            type : serviceState.parentId == null ? "input" : "output",  // COMMENT THIS TO GET DEFAULT NODES
            // extent: 'parent',
            // parentNode: serviceState.parentId == null ? "" : serviceState.parentId + "group"//initialNodes.find((node) => {node.id == serviceState.parentId})[0].
        } as Node;

        initialNodes.push(node);

        if (serviceState.parentId == null) {
            return;
        }
        let edge = {
            id: `${serviceState.parentId} - ${serviceState.id}`,
            hidden: node.hidden,
            source: serviceState.parentId,
            target: serviceState.id,
            ...getEdgeStyle(serviceState.healthStatus)
        } as Edge;

        initialEdges.push(edge);
    });

    return [initialNodes, initialEdges];
};