import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import LoadingOverlay from './LoadingOverlay'
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/Layout/ProtectedRoute'

const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const PrescriptionVerification = lazy(() => import('./pages/PrescriptionVerification'))

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingOverlay />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/verify/:id" element={<PrescriptionVerification />} />
            
            {/* Rotas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}