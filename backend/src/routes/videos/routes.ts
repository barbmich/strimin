import { Hono } from "hono";
import { getHttpClient } from "../../helpers.js";
import { HTTPException } from "hono/http-exception";

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

export function getVideoRouter() {
  const videoRoutes = new Hono();
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

    const res = await httpClient.get("videos", { searchParams: { id } });
    return c.json(res.body);
  });

  return videoRoutes;
}
