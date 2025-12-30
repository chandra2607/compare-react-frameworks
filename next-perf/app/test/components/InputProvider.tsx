'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type InputContextType = {
  username: string;
  setUsername: (value: string) => void;
  usernames: string[];
  addUsername: () => void;
};

const InputContext = createContext<InputContextType | null>(null);

export function InputProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState('');
  const [usernames, setUsernames] = useState<string[]>([]);

  const addUsername = () => {
    if (username.trim()) {
      setUsernames(prev => [...prev, username]);
      setUsername('');
    }
  };

  return (
    <InputContext.Provider value={{ username, setUsername, usernames, addUsername }}>
      {children}
    </InputContext.Provider>
  );
}

export function useInputContext() {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error('useInputContext must be used within InputProvider');
  }
  return context;
}
