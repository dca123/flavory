import { InferModel, InferModelFromColumns, relations } from "drizzle-orm";
import {
  mysqlTable,
  varchar,
  float,
  text,
  serial,
  int,
} from "drizzle-orm/mysql-core";

export const items = mysqlTable("items", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description").notNull(),
  price: float("price").notNull(),
  restaurantId: int("restaurantId").notNull(),
});
export type Item = InferModel<typeof items>;
export const itemsRelations = relations(items, ({ one }) => ({
  restaurant: one(restaurants, {
    fields: [items.restaurantId],
    references: [restaurants.id],
  }),
}));

export const restaurants = mysqlTable("restaurants", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: text("description"),
});
export const restaurantsRelations = relations(restaurants, ({ many }) => ({
  items: many(items),
}));
