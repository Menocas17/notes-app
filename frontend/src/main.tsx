import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<LoadingSpinner />}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Suspense>
  </StrictMode>,
);
