'use client';

import { useInputContext } from './InputProvider';
import { ServerComponent } from './ServerComponent';

export function ServerDisplay() {
  const { username, usernames } = useInputContext();
  
  // This client component reads from context and renders
  // the server component with those values
  return <ServerComponent username={username} usernames={usernames} />;
}