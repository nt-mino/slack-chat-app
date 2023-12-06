import type { Config } from "drizzle-kit";

const drizzleConfig = {
  schema: "./src/database/schema.ts",
  out: "./src/database/migrations",
  breakpoints: true,
  driver: "mysql2",
  dbCredentials: {
    host: "localhost",
    database: "drizzle",
  },
} satisfies Config;

export default drizzleConfig;
