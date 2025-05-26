import { drizzle } from "drizzle-orm/better-sqlite3"; // <-- this is required
import Database from "better-sqlite3";
import * as schema from "./schema.js";

const sqlite = new Database("sqlite.db");

export const db = drizzle(sqlite, { schema });
export type DB = typeof db;
