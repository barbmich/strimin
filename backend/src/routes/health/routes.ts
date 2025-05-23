import { Hono } from "hono";

export function getHealthRouter() {
  const healthRoutes = new Hono();
  healthRoutes.get("/", async (c) => {
    return c.body(null);
  });

  return healthRoutes;
}
