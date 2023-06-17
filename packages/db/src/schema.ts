import {
  mysqlTable,
  varchar,
  float,
  text,
  serial,
} from "drizzle-orm/mysql-core";

export const items = mysqlTable("items", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: text("description"),
  price: float("price"),
});

export const restaurants = mysqlTable("restaurants", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: text("description"),
});
