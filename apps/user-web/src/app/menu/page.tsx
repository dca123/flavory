import Link from "next/link";
import { Suspense } from "react";
import { MenuItems } from "./items";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 space-y-4">
      <div>
        <h1 className="text-6xl font-bold text-center">Menu</h1>
      </div>

      <Link href="/menu/create" className="text-xl p-2 border-2 rounded">
        Create Item
      </Link>
      <Suspense
        fallback={
          <div>
            <h1 className="text-6xl font-bold text-center">Loading...</h1>
          </div>
        }
      >
        <MenuItems />
      </Suspense>
    </main>
  );
}
