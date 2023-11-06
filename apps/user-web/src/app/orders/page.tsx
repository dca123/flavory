import { db, eq, orders } from 'db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session === null) {
    return null;
  }

  const orderData = await db.query.orders.findMany({
    where: eq(orders.customerId, session.user.id),
    with: {
      restaurant: true,
      items: {
        with: {
          item: true,
        },
      },
    },
  });
  console.log(orderData);
  return (
    <div className="space-y-2 w-full flex justify-center">
      {orderData.map((order) => (
        <Link
          key={order.id}
          className="border p-4 rounded flex flex-col w-1/3"
          href={`/orders/${order.id}`}
        >
          <div className="flex flex-row justify-between">
            <h1 className="text-sm text-slate-400">Order #{order.id}</h1>
            <h1 className="text-sm text-slate-400">
              {order.createdAt.toDateString()}
            </h1>
          </div>

          <h2 className="text-lg font-bold">{order.restaurant.name}</h2>
          <ul className="pt-1 pl-4 list-disc">
            {order.items.map((item) => (
              <li key={item.id}>{item.item.name}</li>
            ))}
          </ul>
        </Link>
      ))}
    </div>
  );
}
