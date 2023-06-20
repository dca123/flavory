"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Item, db, orderItems, orders } from "db";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";

export async function createOrder(items: Item[], restaurantId: number) {
  console.log(headers());
  // const session = await getServerSession(authOptions);
  // console.log(session);
  // const savedOrder = await db.insert(orders).values({
  //   restaurantId,
  // });
  // console.log({ savedOrder });
  // const savedOrderItem = await db.insert(orderItems).values(
  //   items.map((item) => ({
  //     orderId: Number(savedOrder.insertId),
  //     itemId: item.id,
  //   }))
  // );
}
