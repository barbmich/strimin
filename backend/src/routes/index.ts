import { Hono } from "hono";
import { getVideoRouter } from "./videos/routes.js";
import { getHealthRouter } from "./health/routes.js";

const api = new Hono();

api.route("/videos", getVideoRouter());
api.route("/health", getHealthRouter());

export { api };
