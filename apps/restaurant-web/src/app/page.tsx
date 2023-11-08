import { auth } from './api/auth/[...nextauth]/route';
import { db, eq, orders, restaurants } from 'db';

export default async function Home() {
  const session = await auth();
  if (session === null) {
    throw new Error('Session is null');
  }
  const restaurant = await db.query.restaurants.findFirst({
    where: eq(restaurants.id, session.user.id),
    with: {
      orders: {
        with: {
          customer: true,
          items: {
            with: {
              item: true,
            },
          },
        },
      },
    },
  });

  if (restaurant === undefined) {
    throw new Error('Restaurant is null');
  }

  return (
    <div className="w-full flex justify-center">
      {restaurant.orders.map((order) => (
        <div key={order.id} className="p-4 border-2 rounded space-y-1 w-1/3">
          <div className="flex flex-row justify-between">
            <h1>Order #{order.id}</h1>
            <h1 className="text-sm text-slate-400">
              {order.createdAt.toDateString()}
            </h1>
          </div>
          <h2>{order.customer.email}</h2>

          <ul className="pt-1 pl-4 list-disc">
            {order.items.map(({ item }) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
