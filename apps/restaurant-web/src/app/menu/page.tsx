import Link from "next/link";
import { Suspense } from "react";
import { MenuItems } from "./items";

export default function Page() {
  return (
    <>
      <Link
        href="/menu/create"
        className="text-xl p-2 border-2 rounded self-end"
      >
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
    </>
  );
}
