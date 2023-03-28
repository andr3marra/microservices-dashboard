import {
    Node,
    Edge,
    Position
} from "reactflow";

import {Status, ServiceState } from "./data";


const healthyNodeStyle =
{
    animated: false,
    style: { stroke: "#27ae60" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left
};

const degradedNodeStyle =
{
    animated: true,
    label: Status.Degraded,
    labelStyle: { fill: "#e67e22", fontWeight: 700 },
    style: { stroke: "#e67e22" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left
};

const unhealtyNodeStyle =
{
    animated: true,
    label: Status.Unhealthy,
    labelStyle: { fill: "#d12121", fontWeight: 700 },
    style: { stroke: "#d12121" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left
};

function getNodeStyle(value: Status) {
    switch (value) {
        case Status.Healthy:
            return healthyNodeStyle;
        case Status.Degraded:
            return degradedNodeStyle;
        case Status.Unhealthy:
            return unhealtyNodeStyle;
    }
}

const data = [
    {
        Id: "aac6b4e4-3d11-4e35-b778-05a65e6d7d02",
        ParentId: "7f4a626e-6c09-402a-b380-ddcc43000a5f",
        Name: "PostGreSQL",
        Url: null,
        Status: Status.Degraded,
        Description: "",
        Metadata: null
    } as ServiceState,
    {
        Id: "2a7052b0-f3f0-4be5-9c7b-b2be529ac1b0",
        ParentId: "7f4a626e-6c09-402a-b380-ddcc43000a5f",
        Name: "Service Goias",
        Url: null,
        Status: Status.Healthy,
        Description: "",
        Metadata: null
    } as ServiceState,
    {
        Id: "7f4a626e-6c09-402a-b380-ddcc43000a5f",
        ParentId: "5d27977c-0653-492f-9923-ff4cdc527cd8",
        Name: "Service Amazonas",
        Url: "www.amazonas.com/health",
        Status: Status.Degraded,
        Description: "",
        Metadata: null
    } as ServiceState,
    {
        Id: "f5599ae7-b455-4fce-92d6-628f4ed956a5",
        ParentId: "9168cb47-a6e5-4957-93ee-2b4927d9f7fe",
        Name: "Service Sao Luis",
        Url:null,
        Status: Status.Unhealthy,
        Description: "",
        Metadata: null
    } as ServiceState,
    {
        Id: "14461a0e-c1de-476c-b475-d2e511d1416e",
        ParentId: "9168cb47-a6e5-4957-93ee-2b4927d9f7fe",
        Name: "Service Curitiba",
        Url: null,
        Status: Status.Healthy,
        Description: "",
        Metadata: null
    } as ServiceState,
    {
        Id: "cdec9a40-f56b-4345-a3b1-f4a6c7451cdc",
        ParentId: "7f4a626e-6c09-402a-b380-ddcc43000a5f",
        Name: "Service Campo Grande",
        Url: "www.campogrande.com/health",
        Status: Status.Healthy,
        Description: "",
        Metadata: null
    } as ServiceState,
    {
        Id: "9168cb47-a6e5-4957-93ee-2b4927d9f7fe",
        ParentId: "5d27977c-0653-492f-9923-ff4cdc527cd8",
        Name: "Service Fortaleza",
        Url: "www.fortaleza.com/health",
        Status: Status.Unhealthy,
        Description: "",
        Metadata: null
    } as ServiceState,
    {
        Id: "5d27977c-0653-492f-9923-ff4cdc527cd8",
        ParentId: null,
        Name: "Gateway São Paulo",
        Url: "www.saopaulo.com/health",
        Status: Status.Degraded,
        Description: "",
        Metadata: null
    } as ServiceState,

] as ServiceState[];

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

export function getData(): [Node[], Edge[]] {

    data.forEach((serviceState: ServiceState)=>{
        let node = {
            id: serviceState.Id,
            // type: serviceState.ParentId == null ? "input" : "default",
            type: "service",
            data: { label: serviceState.Name, status: serviceState.Status },
            position: { x: 0, y: 0 },
            sourcePosition: Position.Right,
            targetPosition: Position.Left
        } as Node;

        console.log("Status", serviceState.Status)

        initialNodes.push(node);

        if(serviceState.ParentId == null){
            return;
        }
        let edge = {
            id: `${serviceState.ParentId} - ${serviceState.Id}`,
            source: serviceState.ParentId,
            target: serviceState.Id,
            ...getNodeStyle(serviceState.Status)
        } as Edge;

        initialEdges.push(edge);
    });

    return [initialNodes, initialEdges];
};