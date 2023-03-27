import {
    Node,
    Edge,
    Position
} from "reactflow";

import { HealthCheckResponse, HealthStatus, Api } from "./data";


const healthyNodeStyle =
{
    animated: false,
    sourcePosition: Position.Right,
    targetPosition: Position.Left
};

const degradedNodeStyle =
{
    animated: true,
    label: HealthStatus[HealthStatus.Degraded],
    labelStyle: { fill: "red", fontWeight: 700 },
    style: { stroke: "orange" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left
};

const unhealtyNodeStyle =
{
    animated: true,
    label: HealthStatus[HealthStatus.Degraded],
    labelStyle: { fill: "red", fontWeight: 700 },
    style: { stroke: "red" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left
};

const results1 = new Map<string, Api>();

results1.set("Service Bolsa", {
    status: HealthStatus.Healthy,
    description: "I am one healthy microservice API",
    data: {}
});

results1.set("Service Boleta", {
    status: HealthStatus.Degraded,
    description: "Not feeling so well, boss!",
    data: {}
});

const results2 = new Map<string, Api>();

results2.set("SQL Server", {
    status: HealthStatus.Healthy,
    description: "I am one healthy microservice API",
    data: {}
});

results2.set("Market Data Info", {
    status: HealthStatus.Degraded,
    description: "Not feeling so well, boss!",
    data: {}
});

const results3 = new Map<string, Api>();
results3.set("PostgreSQL", {
    status: HealthStatus.Healthy,
    description: "I am one healthy microservice API",
    data: {}
});

results3.set("Market Data Information", {
    status: HealthStatus.Degraded,
    description: "Not feeling so well, boss!",
    data: {}
});

const apiresponses: Map<string, HealthCheckResponse> = new Map<
    string,
    HealthCheckResponse
>();

apiresponses.set("Websocket Gateway", {
    status: HealthStatus.Degraded,
    results: results1
});

apiresponses.set("Service Portfolio Boleta", {
    status: HealthStatus.Degraded,
    results: results2
});

apiresponses.set("Service Portfolio Bolsa", {
    status: HealthStatus.Degraded,
    results: results3
});

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [
    // { id: "e1-2", source: "0", target: "1", animated: true }
];


export function getData(): [Node[], Edge[]] {
    var itemCount = 0;
    apiresponses.forEach((responses: HealthCheckResponse, bigNodeName: string) => {
        let bigNode = {
            id: itemCount.toString(),
            type: "default",//"input",
            data: { label: bigNodeName },
            position: { x: 0, y: 0 },
            sourcePosition: Position.Right,
            targetPosition: Position.Left
        } as Node;
        console.log(`Inserted key: ${itemCount}`);
        initialNodes.push(bigNode);
        itemCount++;

        responses.results.forEach((value: Api, smallNodeName: string) => {
            let smallNode = {
                id: itemCount.toString(),
                type: "default", //"output",
                data: { label: smallNodeName },
                position: { x: 0, y: 0 },
                ...degradedNodeStyle
            } as Node;

            let edge = null;

            switch (value.status) {
                case HealthStatus.Healthy:
                    edge = {
                        id: `${bigNode.id} - ${smallNode.id}`,
                        source: bigNode.id,
                        target: smallNode.id,
                        ...healthyNodeStyle
                    } as Edge;
                    break
                case HealthStatus.Degraded:
                    edge = {
                        id: `${bigNode.id} - ${smallNode.id}`,
                        source: bigNode.id,
                        target: smallNode.id,
                        ...degradedNodeStyle
                    } as Edge;
                    break;
                case HealthStatus.Unhealthy:
                    edge = {
                        id: `${bigNode.id} - ${smallNode.id}`,
                        source: bigNode.id,
                        target: smallNode.id,
                        ...unhealtyNodeStyle
                    } as Edge;
                    break;
            }

            initialEdges.push(edge);

            console.log(`Inserted key: ${itemCount}`);
            initialNodes.push(smallNode);
            itemCount++;
        });
    })

    return [initialNodes, initialEdges];
};