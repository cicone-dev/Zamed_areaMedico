import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()


if (import.meta.env.MODE === 'development') {
  try {
    const { makeServer } = await import('./miragejs/server')
    makeServer({ environment: 'development' })
    console.log('[MirageJS] Servidor iniciado com sucesso.')
  } catch (error) {
    console.error('[MirageJS] Falha ao iniciar o servidor:', error)
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)