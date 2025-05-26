import { Hono } from "hono";
import { getVideosRouter } from "./videos/routes.js";
import { getHealthRouter } from "./health/routes.js";
import { getUsersRouter } from "./users/routes.js";

const api = new Hono();

api.route("/videos", getVideosRouter());
api.route("/users", getUsersRouter());
api.route("/health", getHealthRouter());

export { api };
