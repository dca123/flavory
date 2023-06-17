import { db, restaurants } from "db";
import Link from "next/link";
export async function Restaurants() {
  const data = await db.select().from(restaurants);
  return (
    <div className="grid grid-cols-4 gap-3">
      {data.map((restaurant) => (
        <Link
          key={restaurant.id}
          href={`/restaurants/${restaurant.id}`}
          className="flex flex-col space-y-2 p-2 border rounded w-64"
        >
          <h1 className="font-medium">{restaurant.name}</h1>
          <p className="text-sm text-slate-400">{restaurant.description}</p>
        </Link>
      ))}
    </div>
  );
}
