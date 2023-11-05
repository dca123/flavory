import { useSession } from "@/app/useSession";
import currency from "currency.js";
import { db, eq, orderItems, orders } from "db";

export default async function Page({ params }: { params: { id: string } }) {
  const [orderData, orderItemsData] = await Promise.all([
    db.query.orders.findFirst({
      where: eq(orders.id, Number(params.id)),
    }),
    db.query.orderItems.findMany({
      where: eq(orderItems.orderId, Number(params.id)),
      with: {
        item: true,
      },
    }),
  ]);

  if (orderData === undefined) {
    return <div>Order not found</div>;
  }

  const total = orderItemsData.reduce(
    (acc, orderItem) => currency(acc).add(orderItem.item.price).value,
    0
  );

  return (
    <div className="flex space-y-2 flex-col w-72">
      <h1 className="text-sm ">Order #{orderData.id}</h1>
      <h2 className="text-3xl">Items</h2>
      <div className="flex space-y-2 flex-col w-full">
        {orderItemsData.map((orderItem) => (
          <div key={orderItem.id} className="flex justify-between flex-row">
            <div className="text-lg">{orderItem.item.name}</div>
            <div>${orderItem.item.price}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-between w-full">
        <h3 className="text-2xl">Total</h3>
        <p className="text-2xl">${total}</p>
      </div>
    </div>
  );
}
