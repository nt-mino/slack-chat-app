import { db } from ".";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
import drizzleConfig from "../../drizzle.config";

const migrateDB = async () => {
  try {
    await migrate(db, { migrationsFolder: drizzleConfig.out as string });
    console.log("Migrations complete!!");
  } catch (error) {
    console.log(error);
  }
};
migrateDB();
