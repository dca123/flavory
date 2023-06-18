"use client";

import { Item } from "db";
import { PlusCircle } from "lucide-react";
import { z } from "zod";
import { atom, useAtomValue, useSetAtom } from "jotai";

type OrderFormProps = {
  items: Item[];
};
const Schema = z.object({
  items: z.string().array(),
});

const ItemsAtom = atom<Item[]>([]);
const addToItemsAtom = atom(null, (get, set, item: Item) => {
  set(ItemsAtom, [...get(ItemsAtom), item]);
});
const removeFromItemsAtom = atom(null, (get, set, item: Item) => {
  set(
    ItemsAtom,
    get(ItemsAtom).filter((i) => i.id !== item.id)
  );
});
const orderSumAtom = atom((get) => {
  return get(ItemsAtom).reduce((acc, item) => acc + item.price, 0);
});

export function OrderForm(props: OrderFormProps) {
  const items = useAtomValue(ItemsAtom);
  const addToOrder = useSetAtom(addToItemsAtom);

  return (
    <>
      {props.items.map((item) => (
        <div className="border rounded p-5 w-fit max-w-lg" key={item.id}>
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-medium">{item.name}</h1>
            <button onClick={() => addToOrder(item)}>
              <PlusCircle size={24} />
            </button>
          </div>
          <p className="text-sm text-slate-200">${item.price}</p>
          <p className="text-md font-light text-slate-400 pt-2">
            {item.description}
          </p>
        </div>
      ))}
    </>
  );
}

export const OrderBar = () => {
  const cost = useAtomValue(orderSumAtom);
  return (
    <div className="fixed bottom-0 p-2 w-full border rounded-t border-slate-200 bg-slate-950">
      <h1>${cost}</h1>
    </div>
  );
};
