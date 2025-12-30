
type ServerComponentProps = {
  username?: string;
  usernames?: string[];
};

export function ServerComponent({ 
  username = '', 
  usernames = [] 
}: ServerComponentProps) {
  // This is a Server Component (no "use client")
  // However, when rendered by a client component, it becomes
  // part of the client tree and can receive props dynamically
  
  return (
    <div style={{ 
      border: '2px solid #0070f3', 
      padding: '1rem',
      backgroundColor: '#f0f8ff'
    }}>
      <h2>Server Component Display</h2>
      <div style={{ marginBottom: '1rem' }}>
        <strong>In Progress:</strong> {username || '(none)'}
      </div>
      <div>
        <strong>Usernames List:</strong>
        {usernames.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#666' }}>No usernames added yet</p>
        ) : (
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            {usernames.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ 
        marginTop: '1rem', 
        padding: '0.5rem', 
        backgroundColor: '#e6f3ff',
        fontSize: '0.875rem',
        borderRadius: '4px'
      }}>
        ℹ️ This component receives props from client context
      </div>
    </div>
  );
}