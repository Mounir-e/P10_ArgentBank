import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import './Layout.css'

export default function Layout({ children }) {
  return (
    <div className="site-layout">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
