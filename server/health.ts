export type HealthPayload = {
  status: "ok";
  service: "suyash-portfolio-api";
  timestamp: string;
};

export function getHealthPayload(now = new Date()): HealthPayload {
  return {
    status: "ok",
    service: "suyash-portfolio-api",
    timestamp: now.toISOString(),
  };
}
