import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UsersPage from './pages/UsersPage';
import React from 'react';
import './index.css';   // Tailwind directives reside here

const qc = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={qc}>
      <UsersPage />
    </QueryClientProvider>
  );
}

export default App;
