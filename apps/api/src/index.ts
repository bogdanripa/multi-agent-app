import Fastify from "fastify";
import type { HealthResponse } from "@acme/shared";

const app = Fastify({ logger: true });

app.get("/api/health", async () => {
  const res: HealthResponse = { ok: true, service: "api", time: new Date().toISOString() };
  return res;
});

const port = Number(process.env.PORT ?? 3001);
const host = "0.0.0.0";

app.listen({ port, host }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
