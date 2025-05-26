import { Hono } from "hono";
import type { AppContext } from "../../index.js";

export function getHealthRouter() {
  const healthRoutes = new Hono<AppContext>();
  healthRoutes.get("/", async (c) => {
    return c.body(null);
  });

  return healthRoutes;
}
