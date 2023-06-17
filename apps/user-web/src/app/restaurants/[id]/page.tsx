import { db, eq, items, restaurants } from "db";
import { Suspense } from "react";

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
    </div>
  );
}

type HeaderProps = {
  restaurantId: number;
};
async function Header(props: HeaderProps) {
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
export async function Menu(props: MenuProps) {
  const menuItems = await db.query.items.findMany({
    where: (items, { eq }) => eq(items.restaurantId, props.restaurantId),
  });
  return (
    <div className="grid grid-cols-3 gap-3">
      {menuItems.map((item) => (
        <div className="border rounded p-5 w-fit max-w-lg" key={item.id}>
          <h1 className="text-2xl font-medium">{item.name}</h1>
          <p className="text-sm text-slate-200">${item.price}</p>
          <p className="text-md font-light text-slate-400 pt-2">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export async function generateStaticParams() {
  const restaurants = await db.query.restaurants.findMany();

  return restaurants.map((post) => ({
    id: String(post.id),
  }));
}
