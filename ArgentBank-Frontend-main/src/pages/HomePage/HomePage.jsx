import Feature from '../../components/Feature/Feature.jsx'
import Layout from '../../components/Layout/Layout.jsx'
import chatIcon from '../../../img/icon-chat.webp'
import moneyIcon from '../../../img/icon-money.webp'
import securityIcon from '../../../img/icon-security.webp'
import './HomePage.css'

const features = [
  { image: chatIcon, alt: 'Chat', title: 'You are our #1 priority', text: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.' },
  { image: moneyIcon, alt: 'Money', title: 'More savings means higher rates', text: 'The more you save with us, the higher your interest rate will be!' },
  { image: securityIcon, alt: 'Security', title: 'Security you can trust', text: 'We use top of the line encryption to make sure your data and money is always safe.' },
]

export default function HomePage() {
  return (
    <Layout>
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          {features.map((feature) => <Feature key={feature.title} {...feature}>{feature.text}</Feature>)}
        </section>
      </main>
    </Layout>
  )
}
