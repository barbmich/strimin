import { Hono } from "hono";
import { getVideoRouter } from "./videos/routes.js";

const api = new Hono();

api.route("/videos", getVideoRouter());

export { api };
