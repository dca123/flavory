import { db, eq, restaurants } from "db";
import { Suspense } from "react";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <Suspense>
        <Header restaurantId={Number(params.id)} />
      </Suspense>
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
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-4xl font-medium">{restaurant.name}</h1>
      <p className="text-md font-light">{restaurant.description}</p>
    </div>
  );
}

export async function generateStaticParams() {
  const restaurants = await db.query.restaurants.findMany();

  return restaurants.map((post) => ({
    id: post.id,
  }));
}
