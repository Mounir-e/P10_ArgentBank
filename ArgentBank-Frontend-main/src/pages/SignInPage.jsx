import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout.jsx'
import { clearError, login } from '../store/authSlice.js'

export default function SignInPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { token, user, status, error } = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  useEffect(() => () => dispatch(clearError()), [dispatch])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await dispatch(login({ email, password, remember }))
    if (login.fulfilled.match(result)) navigate(location.state?.from?.pathname || '/profile', { replace: true })
  }

  if (token && user) return <Navigate to="/profile" replace />

  return (
    <Layout>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon" aria-hidden="true" />
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="sign-in-button" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </section>
      </main>
    </Layout>
  )
}
