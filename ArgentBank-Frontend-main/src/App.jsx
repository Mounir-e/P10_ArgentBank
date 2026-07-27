import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HomePage from './pages/HomePage/HomePage.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx'
import SignInPage from './pages/SignInPage/SignInPage.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import { fetchProfile } from './store/authSlice.js'

export default function App() {
  const dispatch = useDispatch()
  const { token, user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (token && !user) dispatch(fetchProfile())
  }, [dispatch, token, user])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
