import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createId } from "@paralleldrive/cuid2";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  email: text("email").notNull(),
  userName: text("name").notNull(),
  avatar: text("avatar"),
  createdAt: timestamp("createdAt").defaultNow(),
});
