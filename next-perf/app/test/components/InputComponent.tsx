'use client';

import { useInputContext } from './InputProvider';

export function InputComponent() {
  const { username, setUsername, addUsername } = useInputContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUsername();
  };

  return (
    <div>
      <h2>Input Controls (Client Component)</h2>
      <div onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          style={{
            padding: '0.5rem',
            border: '1px solid #999',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />
        <button
          onClick={addUsername}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Add Username
        </button>
      </div>
    </div>
  );
}