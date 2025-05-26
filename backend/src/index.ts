import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono, type Context } from "hono";
import { cors } from "hono/cors";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { api } from "./routes/index.js";
import { db } from "./db/index.js";
import { errorHandler } from "./helpers.js";
import * as schema from "./db/schema.js";

export interface AppContext {
  Variables: {
    db: BetterSQLite3Database<typeof schema>;
  };
}

async function main() {
  try {
    const app = new Hono<AppContext>();

    // Attach db to context
    app.use("*", async (c, next) => {
      c.set("db", db);
      await next();
    });
    app.use(
      "*",
      cors({
        origin: (origin) => origin ?? "",
        credentials: true,
      })
    );

    app.route("/api", api);

    // Global error handler. This could be also done on a router level to handle
    // errors specific to a third party API interaction.
    app.onError((error, c) => errorHandler(error));

    serve(
      {
        fetch: app.fetch,
        port: 3000,
      },
      (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
      }
    );
    // Graceful shutdown hooks
    process.on("SIGINT", () => {
      console.log("Received SIGINT. Shutting down...");
      process.exit(0);
    });
  } catch (err) {
    console.error("Fatal error during startup:", err);
    process.exit(1);
  }
}

main();
