import { Hono } from "hono";
import { errorHandler, getHttpClient } from "../../helpers.js";

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
    const { page = "1" } = c.req.query();

    const res = await httpClient.get("videos", {
      searchParams: { page },
    });

    return c.json(res.body);
  });

  videoRoutes.onError((err, c) => errorHandler(err));

  return videoRoutes;
}
