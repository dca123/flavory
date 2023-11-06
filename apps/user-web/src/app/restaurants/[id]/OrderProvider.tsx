'use client';
import { Provider } from 'jotai';
import { PropsWithChildren } from 'react';

export function OrderProvider(props: PropsWithChildren) {
  return <Provider>{props.children}</Provider>;
}
