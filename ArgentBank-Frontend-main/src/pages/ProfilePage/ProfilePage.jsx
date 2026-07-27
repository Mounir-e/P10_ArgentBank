import { useState } from 'react'
import { useSelector } from 'react-redux'
import Account from '../../components/Account/Account.jsx'
import Layout from '../../components/Layout/Layout.jsx'
import UserNameForm from '../../components/UserNameForm/UserNameForm.jsx'
import './ProfilePage.css'

const accounts = [
  { id: 'checking-8349', title: 'Argent Bank Checking (x8349)', amount: '$2,082.79', description: 'Available Balance' },
  { id: 'savings-6712', title: 'Argent Bank Savings (x6712)', amount: '$10,928.42', description: 'Available Balance' },
  { id: 'credit-8349', title: 'Argent Bank Credit Card (x8349)', amount: '$184.30', description: 'Current Balance' },
]

export default function ProfilePage() {
  const user = useSelector((state) => state.auth.user)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Layout>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
          {isEditing ? (
            <UserNameForm onClose={() => setIsEditing(false)} />
          ) : (
            <button className="edit-button" type="button" onClick={() => setIsEditing(true)}>Edit Name</button>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        {accounts.map((account) => <Account key={account.title} {...account} />)}
      </main>
    </Layout>
  )
}
