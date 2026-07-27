import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUpdateState, updateUserName } from '../store/authSlice.js'

export default function UserNameForm({ onClose }) {
  const dispatch = useDispatch()
  const { user, updateStatus, updateError } = useSelector((state) => state.auth)
  const [userName, setUserName] = useState(user.userName)

  useEffect(() => () => dispatch(clearUpdateState()), [dispatch])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const normalizedUserName = userName.trim()
    if (!normalizedUserName) return
    const result = await dispatch(updateUserName(normalizedUserName))
    if (updateUserName.fulfilled.match(result)) onClose()
  }

  return (
    <form className="edit-user-form" onSubmit={handleSubmit}>
      <h2>Edit user info</h2>
      <div className="edit-user-field">
        <label htmlFor="userName">User name:</label>
        <input id="userName" name="userName" value={userName} onChange={(event) => setUserName(event.target.value)} required />
      </div>
      <div className="edit-user-field">
        <label htmlFor="firstName">First name:</label>
        <input id="firstName" name="firstName" value={user.firstName} disabled />
      </div>
      <div className="edit-user-field">
        <label htmlFor="lastName">Last name:</label>
        <input id="lastName" name="lastName" value={user.lastName} disabled />
      </div>
      {updateError && <p className="form-error" role="alert">{updateError}</p>}
      <div className="edit-user-actions">
        <button className="edit-form-button" type="submit" disabled={updateStatus === 'loading'}>
          {updateStatus === 'loading' ? 'Saving…' : 'Save'}
        </button>
        <button className="edit-form-button" type="button" onClick={onClose} disabled={updateStatus === 'loading'}>Cancel</button>
      </div>
    </form>
  )
}
