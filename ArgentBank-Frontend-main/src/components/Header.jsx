import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice.js'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, user } = useSelector((state) => state.auth)
  const handleLogout = () => {
    navigate('/sign-in', { replace: true })
    dispatch(logout())
  }

  return (
    <nav className="main-nav" aria-label="Main navigation">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src="/img/argentBankLogo.png" alt="Argent Bank" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token && user ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle" aria-hidden="true" /> {user.userName}
            </Link>
            <button className="main-nav-item main-nav-button" type="button" onClick={handleLogout}>
              <i className="fa fa-sign-out" aria-hidden="true" /> Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle" aria-hidden="true" /> Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
