'use client';
import type { Item as ItemModel } from 'db';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import currency from 'currency.js';
import { MinusCircle, PlusCircle } from 'lucide-react';

export const ItemsAtom = atom<ItemModel[]>([]);
const addToItemsAtom = atom(null, (get, set, item: ItemModel) => {
  set(ItemsAtom, [...get(ItemsAtom), item]);
});
const removeFromItemsAtom = atom(null, (get, set, item: ItemModel) => {
  set(
    ItemsAtom,
    get(ItemsAtom).filter((i) => i.id !== item.id),
  );
});

type OrderFormProps = {
  items: ItemModel[];
};

export function MenuItems(props: OrderFormProps) {
  return props.items.map((item) => <ItemCard item={item} key={item.id} />);
}
type ItemCardProps = {
  item: ItemModel;
};

function ItemCard(props: ItemCardProps) {
  const items = useAtomValue(ItemsAtom);
  const addToOrder = useSetAtom(addToItemsAtom);
  const removeFromOrder = useSetAtom(removeFromItemsAtom);
  const hasItem = items.find((i) => i.id === props.item.id) !== undefined;

  if (hasItem === true) {
    return (
      <div className="border rounded p-5 w-fit max-w-lg bg-slate-200">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-medium text-background">
            {props.item.name}
          </h1>
          <button onClick={() => removeFromOrder(props.item)}>
            <MinusCircle size={24} className="text-background" />
          </button>
        </div>
        <p className="text-sm  text-slate-700">${props.item.price}</p>
        <p className="text-md font-light pt-2 text-slate-600">
          {props.item.description}
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded p-5 w-fit max-w-lg">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-medium">{props.item.name}</h1>
        <button onClick={() => addToOrder(props.item)}>
          <PlusCircle size={24} />
        </button>
      </div>
      <p className="text-sm text-slate-200">${props.item.price}</p>
      <p className="text-md font-light text-slate-400 pt-2">
        {props.item.description}
      </p>
    </div>
  );
}
