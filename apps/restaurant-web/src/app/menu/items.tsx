import { db, items } from "db";

export const MenuItems = async () => {
  const dbItems = await db.select().from(items);
  return (
    <div className="flex flex-col items-center justify-center space-y-2 w-full">
      {dbItems.map((item) => (
        <div
          key={item.id}
          className="flex space-x-12 border-2 rounded py-6 w-full justify-between px-4"
        >
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};
