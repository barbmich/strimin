import { Hono } from "hono";
import { getHttpClient } from "../../helpers.js";
import { HTTPException } from "hono/http-exception";
import type { AppContext } from "../../index.js";

const httpClient = getHttpClient({
  prefixUrl: "https://pixabay.com/api",
  beforeRequest: (options) => {
    if (!options.searchParams) {
      options.searchParams = new URLSearchParams();
    }
    (options.searchParams as URLSearchParams).append(
      "key",
      process.env.PIXABAY_API_KEY!
    );
  },
});

export function getVideosRouter() {
  const videoRoutes = new Hono<AppContext>();
  videoRoutes.get("/", async (c) => {
    const { page = "1", q = "" } = c.req.query();

    const res = await httpClient.get("videos", {
      searchParams: { page, q },
    });

    return c.json(res.body);
  });

  videoRoutes.get("/:id", async (c) => {
    const id = c.req.param("id");

    if (!id) {
      throw new HTTPException(400, {
        message: "ID is required",
      });
    }

    if (isNaN(Number(id))) {
      throw new HTTPException(400, {
        message: "ID must be a number",
      });
    }

    const res = await httpClient.get("videos", { searchParams: { id } });
    return c.json(res.body);
  });

  return videoRoutes;
}
