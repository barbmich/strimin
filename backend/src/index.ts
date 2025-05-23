import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { db } from "./db/index.js";
import { sql } from "drizzle-orm/sql";
import { api } from "./routes/index.js";
import { errorHandler } from "./helpers.js";

async function initDb() {
  db.run(sql`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )
  `);
}

const app = new Hono();
await initDb();

app.use("*", cors());

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
