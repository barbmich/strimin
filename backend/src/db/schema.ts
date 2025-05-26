import {
  sqliteTable,
  text,
  primaryKey,
  integer,
} from "drizzle-orm/sqlite-core";

export const subscriptions = sqliteTable(
  "subscriptions",
  {
    subscriberId: text("subscriber_id").notNull(),
    channelId: integer("channel_id").notNull(),
  },
  (table) => [primaryKey({ columns: [table.subscriberId, table.channelId] })]
);
