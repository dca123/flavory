import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

// create the connection
const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});
console.log("🚀 ~ file: drizzle.ts:10 ~ connection:", connection);

export const db = drizzle(connection);
