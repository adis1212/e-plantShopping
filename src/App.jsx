import { useState } from 'react'
import AboutUs from './AboutUs.jsx'
import ProductList from './ProductList.jsx'
import CartItem from './CartItem.jsx'
import './App.css'

function App() {
  const [page, setPage] = useState('home')

  if (page === 'products') {
    return <ProductList onCart={() => setPage('cart')} />
  }

  if (page === 'cart') {
    return <CartItem onContinueShopping={() => setPage('products')} />
  }

  return (
    <main className="landing-page">
      <div className="landing-shade" />
      <header className="landing-header">
        <a className="brand-lockup" href="#home" aria-label="Paradise Nursery home">
          <span className="brand-mark" aria-hidden="true">✿</span>
          <span>Paradise Nursery</span>
        </a>
      </header>
      <section className="hero-content" id="home">
        <p className="eyebrow">A little more green, a lot more life</p>
        <h1>Bring home your<br /><em>own paradise.</em></h1>
        <p className="hero-copy">Thoughtfully grown plants to make your everyday feel a little more alive.</p>
        <button className="primary-button hero-button" onClick={() => setPage('products')}>
          Get Started <span aria-hidden="true">→</span>
        </button>
      </section>
      <AboutUs />
    </main>
  )
}

export default App