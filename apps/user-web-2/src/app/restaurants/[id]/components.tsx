'use client';

import type { Item as ItemModel } from 'db';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import currency from 'currency.js';
import { useParams } from 'next/navigation';
// import { useFormStatus } from 'react-dom';
import { createOrder } from './actions';

// type OrderFormProps = {
//   items: ItemModel[];
// };

// const ItemsAtom = atom<ItemModel[]>([]);
// const addToItemsAtom = atom(null, (get, set, item: ItemModel) => {
//   set(ItemsAtom, [...get(ItemsAtom), item]);
// });
// const removeFromItemsAtom = atom(null, (get, set, item: ItemModel) => {
//   set(
//     ItemsAtom,
//     get(ItemsAtom).filter((i) => i.id !== item.id),
//   );
// });
// const orderSumAtom = atom((get) => {
//   return get(ItemsAtom).reduce(
//     (acc, item) => currency(acc).add(item.price).value,
//     0,
//   );
// });

// export function OrderForm(props: OrderFormProps) {
//   return props.items.map((item) => <ItemCard item={item} key={item.id} />);
// }
// type ItemCardProps = {
//   item: ItemModel;
// };
const ItemCard = (props: ItemCardProps) => {
  // const items = useAtomValue(ItemsAtom);
  // const addToOrder = useSetAtom(addToItemsAtom);
  // const removeFromOrder = useSetAtom(removeFromItemsAtom);
  // const hasItem = items.find((i) => i.id === props.item.id) !== undefined;

  // if (hasItem === true) {
  // return (
  //   <div className="border rounded p-5 w-fit max-w-lg bg-slate-200">
  //     <div className="flex flex-row justify-between">
  //       <h1 className="text-2xl font-medium text-background">
  //         {props.item.name}
  //       </h1>
  //       <button onClick={() => removeFromOrder(props.item)}>
  //         <MinusCircle size={24} className="text-background" />
  //       </button>
  //     </div>
  //     <p className="text-sm  text-slate-700">${props.item.price}</p>
  //     <p className="text-md font-light pt-2 text-slate-600">
  //       {props.item.description}
  //     </p>
  //   </div>
  // );
  // }

  return (
    <div className="border rounded p-5 w-fit max-w-lg">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-medium">{props.item.name}</h1>
        {/* <button onClick={() => addToOrder(props.item)}> */}
        <PlusCircle size={24} />
        {/* </button> */}
      </div>
      <p className="text-sm text-slate-200">${props.item.price}</p>
      <p className="text-md font-light text-slate-400 pt-2">
        {props.item.description}
      </p>
    </div>
  );
};

// export const OrderBar = () => {
//   const cost = useAtomValue(orderSumAtom);
//   const items = useAtomValue(ItemsAtom);
//   const { id } = useParams();
//   // const { pending } = useFormStatus();

//   if (cost === 0) {
//     return null;
//   }

//   return (
//     <div className="fixed w-full left-0 bottom-4 flex justify-center">
//       <div className="w-[80%] p-4 rounded border border-slate-200 bg-slate-950 flex flex-row space-x-4 items-center justify-end">
//         <h1 className="text-2xl">${cost}</h1>
//         <form action={() => createOrder(items, Number(id))}>
//           <button className="p-2 border rounded border-white">
//             {/* {pending ? 'Creating Order' : 'Checkout'} */}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
