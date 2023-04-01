export enum HealthStatus {
  Unhealthy,
  Degraded,
  Healthy
}

export interface ServiceState {
  id : string,
  parentId : string|null,
  name : string,
  url : string|null,
  healthStatus : HealthStatus,
  description?: string|null,
  tags? : string[]|null
}