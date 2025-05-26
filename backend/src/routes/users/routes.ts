import { Hono } from "hono";
import type { AppContext } from "../../index.js";
import { clerkMiddleware } from "@hono/clerk-auth";
import { validateUser } from "../../auth/validateUser.js";
import { subscriptions } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { getHttpClient } from "../../helpers.js";
import { HTTPError } from "got";

const httpClient = getHttpClient({
  prefixUrl: "https://pixabay.com/",
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

export function getUsersRouter() {
  const userRoutes = new Hono<AppContext>();
  userRoutes.get("/:id/videos", async (c) => {
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

    const res = await httpClient.get("api/videos", {
      searchParams: { user_id: id },
    });
    return c.json(res.body);
  });

  userRoutes.all("*", clerkMiddleware());
  userRoutes.get("/subscriptions", async (c) => {
    const user = validateUser(c);
    const db = c.get("db");

    const userSubscriptions = await db
      .select({ channelId: subscriptions.channelId })
      .from(subscriptions)
      .where(eq(subscriptions.subscriberId, user.userId));

    return c.json({
      subscriptions: userSubscriptions,
    });
  });

  userRoutes.get("/subscriptions/:id", async (c) => {
    const user = validateUser(c);
    const channelId = c.req.param("id");

    if (!channelId) {
      throw new HTTPException(400, {
        message: "ID is required",
      });
    }

    const channelIdNumber = Number(channelId);

    if (isNaN(channelIdNumber)) {
      throw new HTTPException(400, {
        message: "ID must be a number",
      });
    }

    const db = c.get("db");
    const subscription = db
      .select()
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.subscriberId, user.userId),
          eq(subscriptions.channelId, channelIdNumber)
        )
      )
      .get();

    return c.json({ isSubscribed: !!subscription }, 200);
  });

  userRoutes.post("/subscriptions/:id", async (c) => {
    const user = validateUser(c);
    const channelId = c.req.param("id");

    if (!channelId) {
      throw new HTTPException(400, {
        message: "ID is required",
      });
    }

    const channelIdNumber = Number(channelId);

    if (isNaN(channelIdNumber)) {
      throw new HTTPException(400, {
        message: "ID must be a number",
      });
    }

    try {
      // This validation request is blocked by Cloudflare bot/spam protection challenge.
      // await httpClient.get(`users/${channelIdNumber}`);
    } catch (err) {
      if (err instanceof HTTPError) {
        console.log(err);
        throw new HTTPException(404, {
          message: "User not found",
        });
      } else {
        throw new HTTPException(500, {
          message: "Internal server error",
        });
      }
    }

    const db = c.get("db");
    await db
      .insert(subscriptions)
      .values({
        subscriberId: user.userId,
        channelId: channelIdNumber,
      })
      .onConflictDoNothing();

    return c.body(null, 201);
  });

  userRoutes.delete("/subscriptions/:id", async (c) => {
    const user = validateUser(c);
    const channelId = c.req.param("id");

    if (!channelId) {
      throw new HTTPException(400, {
        message: "ID is required",
      });
    }

    const channelIdNumber = Number(channelId);

    if (isNaN(channelIdNumber)) {
      throw new HTTPException(400, {
        message: "ID must be a number",
      });
    }

    const db = c.get("db");
    const x = await db
      .delete(subscriptions)
      .where(
        and(
          eq(subscriptions.subscriberId, user.userId),
          eq(subscriptions.channelId, channelIdNumber)
        )
      );
    console.log(x);

    return c.body(null, 204);
  });

  return userRoutes;
}
