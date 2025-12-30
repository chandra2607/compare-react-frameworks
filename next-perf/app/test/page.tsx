import { InputProvider } from './components/InputProvider';
import { InputComponent } from './components/InputComponent';
import { ServerDisplay } from './components/ServerDisplay';

export default function Page() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>RSC Composition Pattern Demo</h1>
      <InputProvider>
        <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <InputComponent />
        </div>
        <ServerDisplay />
      </InputProvider>
    </main>
  );
}