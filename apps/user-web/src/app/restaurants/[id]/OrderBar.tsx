'use client';
import { atom, useAtomValue } from 'jotai';
import { useParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { ItemsAtom } from './MenuItems';
import currency from 'currency.js';
import { createOrder } from './actions';

const orderSumAtom = atom((get) => {
  return get(ItemsAtom).reduce(
    (acc, item) => currency(acc).add(item.price).value,
    0,
  );
});

export const OrderBar = () => {
  const cost = useAtomValue(orderSumAtom);
  const items = useAtomValue(ItemsAtom);
  const { id } = useParams();
  const { pending } = useFormStatus();

  if (cost === 0) {
    return null;
  }

  return (
    <div className="fixed w-full left-0 bottom-4 flex justify-center">
      <div className="w-[80%] p-4 rounded border border-slate-200 bg-slate-950 flex flex-row space-x-4 items-center justify-end">
        <h1 className="text-2xl">${cost}</h1>
        <form action={() => createOrder(items, Number(id))}>
          <button className="p-2 border rounded border-white" type="submit">
            {pending ? 'Creating Order' : 'Checkout'}
          </button>
        </form>
      </div>
    </div>
  );
};
