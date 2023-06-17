import { Suspense } from "react";
import { Restaurants } from "./Restaurants";

export default function Home() {
  return (
    <div>
      <Suspense>
        <Restaurants />
      </Suspense>
    </div>
  );
}
