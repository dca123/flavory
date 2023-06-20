import { db, eq, restaurants } from "db";
import { Suspense } from "react";
import { OrderBar, OrderForm } from "./components";
import { createOrder } from "./createOrder";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      <Suspense>
        <Header restaurantId={Number(params.id)} />
      </Suspense>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Menu</h2>
        <Suspense>
          <Menu restaurantId={Number(params.id)} />
        </Suspense>
      </div>
      <OrderBar createOrder={createOrder} />
    </div>
  );
}

type HeaderProps = {
  restaurantId: number;
};
async function Header(props: HeaderProps) {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ file: page.tsx:8 ~ Page ~ session:", session);

  const restaurant = await db.query.restaurants.findFirst({
    where: eq(restaurants.id, props.restaurantId),
  });
  if (restaurant === undefined) {
    throw new Error("Restaurant not found");
  }
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-4xl font-medium">{restaurant.name}</h1>
      <p className="text-md font-light">{restaurant.description}</p>
    </div>
  );
}

type MenuProps = { restaurantId: number };
async function Menu(props: MenuProps) {
  const menuItems = await db.query.items.findMany({
    where: (items, { eq }) => eq(items.restaurantId, props.restaurantId),
  });
  return (
    <div className="grid grid-cols-3 gap-3">
      <OrderForm items={menuItems} />
    </div>
  );
}

// export async function generateStaticParams() {
//   const restaurants = await db.query.restaurants.findMany();

//   return restaurants.map((post) => ({
//     id: String(post.id),
//   }));
// }
