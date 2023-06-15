import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-6xl font-bold text-center">Menu</h1>
      </div>
      <Link href="/menu/create" className="text-xl">
        Create Item
      </Link>
    </main>
  );
}
