export enum Status {
  Healthy = "Healthy",
  Degraded = "Degraded",
  Unhealthy = "Unhealthy"
}

export interface ServiceState{
  Id : string,
  ParentId : string|null,
  Name : string,
  Url : string|null,
  Status : Status,
  Description: string|null,
  Metadata? : string[]|null
}