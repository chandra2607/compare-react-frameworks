'use client';

import { useInputContext } from './InputProvider';
import { ReactNode, cloneElement, isValidElement } from 'react';

export function CurrentValueWrapper({ children }: { children: ReactNode }) {
  const { username, usernames } = useInputContext();
  console.log({username,usernames,children})
  // Pass data to server component via props
  // This works because RSC payloads can receive props from client components
  if (isValidElement(children)) {
    return cloneElement(children, { username, usernames } as any);
  }
  
  return <>{children}</>;
}
