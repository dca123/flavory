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

export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  restaurantId: int("restaurantId").notNull(),
  customerId: int("customerId").notNull(),
});
export const ordersRelations = relations(orders, ({ one, many }) => ({
  restaurant: one(restaurants, {
    fields: [orders.restaurantId],
    references: [restaurants.id],
  }),
  items: many(items),
  customer: one(users, {
    fields: [orders.customerId],
    references: [users.id],
  }),
}));

export const orderItems = mysqlTable("orderItems", {
  id: serial("id").primaryKey(),
  orderId: int("orderId").notNull(),
  itemId: int("itemId").notNull(),
});
export const orderItemsRelations = relations(orderItems, ({ one, many }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  items: many(items),
}));

export const users = mysqlTable("customers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull(),
  passwordHash: varchar("passwordHash", { length: 256 }).notNull(),
});
