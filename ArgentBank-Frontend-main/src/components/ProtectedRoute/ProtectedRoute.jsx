import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './ProtectedRoute.css'

export default function ProtectedRoute() {
  const { token, user, status } = useSelector((state) => state.auth)
  const location = useLocation()

  if (token && !user && status === 'loading') {
    return <main className="main bg-dark loading-screen" aria-live="polite">Loading profile…</main>
  }

  if (!token || !user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  return <Outlet />
}
