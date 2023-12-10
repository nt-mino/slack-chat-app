import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import * as schema from "./schema";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const connection = connect({
  url: process.env.DATABASE_URL as string,
});
export const db = drizzle(connection, { schema });
