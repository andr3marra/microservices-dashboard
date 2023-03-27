export interface HealthCheckResponse {
  status: HealthStatus;
  results: Map<string, Api>;
}

export interface Results {
  item: Api[];
}

export interface Api {
  status: HealthStatus;
  description: string;
  data: Data;
}

export interface Data {}

export enum HealthStatus {
  Healthy = 1,
  Degraded,
  Unhealthy
}
