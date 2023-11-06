import { relations } from 'drizzle-orm';
import {
  mysqlTable,
  varchar,
  float,
  text,
  serial,
  int,
  decimal,
  datetime,
} from 'drizzle-orm/mysql-core';

export const items = mysqlTable('items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description').notNull(),
  price: decimal('price', {
    scale: 2,
    precision: 10,
  }).notNull(),
  restaurantId: int('restaurantId').notNull(),
});
export type Item = typeof items.$inferSelect;
export const itemsRelations = relations(items, ({ one }) => ({
  restaurant: one(restaurants, {
    fields: [items.restaurantId],
    references: [restaurants.id],
  }),
}));

export const restaurants = mysqlTable('restaurants', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description').notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  passwordHash: varchar('passwordHash', { length: 256 }).notNull(),
});
export const restaurantsRelations = relations(restaurants, ({ many }) => ({
  items: many(items),
}));

export const orders = mysqlTable('orders', {
  id: serial('id').primaryKey(),
  restaurantId: int('restaurantId').notNull(),
  customerId: int('customerId').notNull(),
  createdAt: datetime('createdAt').notNull(),
});
export const ordersRelations = relations(orders, ({ one, many }) => ({
  restaurant: one(restaurants, {
    fields: [orders.restaurantId],
    references: [restaurants.id],
  }),
  items: many(orderItems),
  customer: one(users, {
    fields: [orders.customerId],
    references: [users.id],
  }),
}));

export const orderItems = mysqlTable('orderItems', {
  id: serial('id').primaryKey(),
  orderId: int('orderId').notNull(),
  itemId: int('itemId').notNull(),
});
export const orderItemsRelations = relations(orderItems, ({ one, many }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  item: one(items, {
    fields: [orderItems.itemId],
    references: [items.id],
  }),
}));

export const users = mysqlTable('customers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 256 }).notNull(),
  passwordHash: varchar('passwordHash', { length: 256 }).notNull(),
});
