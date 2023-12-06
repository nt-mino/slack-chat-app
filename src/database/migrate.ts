import { db } from ".";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
import drizzleConfig from "../../drizzle.config";

const migrateDB = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }
  await migrate(db, { migrationsFolder: drizzleConfig.out as string });
  console.log("Migrations complete!!");
};
migrateDB();
