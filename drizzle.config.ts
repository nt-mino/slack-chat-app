import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const drizzleConfig = {
  schema: "./src/database/schema.ts",
  out: "./src/database/migrations",
  breakpoints: true,
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URL!,
  },
} satisfies Config;

export default drizzleConfig;
