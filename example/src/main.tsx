import { QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import "./style.css";

import { queryClient, wagmiConfig } from './config.ts'
import { App } from './App/App.tsx';

createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </WagmiProvider>,
)
