import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const order = {
    id: "1",
    items: [
      {
        id: "1",
        name: "Pizza",
      },
      {
        id: "2",
        name: "Burger",
      },
    ],
  };
  return (
    <div>
      <div className="p-4 border-2 rounded space-y-1">
        <h1>Order #1234</h1>
        <h2>Devinda Senanayake</h2>
        <div className="border rounded-full text-center w-fit px-3">
          <p>Pending</p>
        </div>
      </div>
    </div>
  );
}
