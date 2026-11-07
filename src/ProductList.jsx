import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from './CartSlice.jsx'
import './ProductList.css'

const plantGroups = [
  {
    category: 'Easy-care favorites',
    intro: 'Beautiful greenery that is happy to grow at your pace.',
    plants: [
      { name: 'Golden Pothos', price: 18, description: 'Trailing heart-shaped leaves with splashes of gold.', image: 'photo-1497250681960-ef046c08a56e' },
      { name: 'Snake Plant', price: 24, description: 'A sculptural, resilient favorite for any bright corner.', image: 'photo-1501004318641-b39e6451bec6' },
      { name: 'ZZ Plant', price: 28, description: 'Glossy foliage that thrives with very little fuss.', image: 'photo-1485955900006-10f4d324d411' },
      { name: 'Jade Plant', price: 16, description: 'A cheerful succulent with plump, rounded leaves.', image: 'photo-1509423350716-97f9360b4e09' },
      { name: 'Rubber Plant', price: 38, description: 'Deep green leaves bring a bold, polished look.', image: 'photo-1483794344563-d27a8d18014e' },
      { name: 'Spider Plant', price: 22, description: 'Arching striped leaves make a lively hanging display.', image: 'photo-1487530811176-3780de880c2d' },
    ],
  },
  {
    category: 'Statement greenery',
    intro: 'Leafy silhouettes and standout textures for your favorite room.',
    plants: [
      { name: 'Monstera Deliciosa', price: 48, description: 'Iconic split leaves with a tropical, easygoing feel.', image: 'photo-1501004318641-b39e6451bec6' },
      { name: 'Fiddle Leaf Fig', price: 68, description: 'A tall, elegant focal point with broad violin-shaped leaves.', image: 'photo-1485955900006-10f4d324d411' },
      { name: 'Bird of Paradise', price: 62, description: 'Upright tropical leaves that make a room feel sunny.', image: 'photo-1466692476868-aef1dfb1e735' },
      { name: 'Calathea Orbifolia', price: 42, description: 'Soft round leaves dressed in delicate silver stripes.', image: 'photo-1497250681960-ef046c08a56e' },
      { name: 'Parlor Palm', price: 32, description: 'Feathery fronds add a calm, graceful touch indoors.', image: 'photo-1487530811176-3780de880c2d' },
      { name: 'Chinese Money Plant', price: 26, description: 'Playful coin-shaped leaves on a compact little plant.', image: 'photo-1509423350716-97f9360b4e09' },
    ],
  },
  {
    category: 'Pet-friendly picks',
    intro: 'A little more green for shared spaces and curious companions.',
    plants: [
      { name: 'Boston Fern', price: 29, description: 'Lush, ruffled fronds love a bright spot and a little humidity.', image: 'photo-1483794344563-d27a8d18014e' },
      { name: 'Calathea Rattlesnake', price: 34, description: 'Wavy patterned leaves bring movement and rich color.', image: 'photo-1497250681960-ef046c08a56e' },
      { name: 'Areca Palm', price: 54, description: 'Soft golden-green fronds create a relaxed tropical mood.', image: 'photo-1466692476868-aef1dfb1e735' },
      { name: 'Prayer Plant', price: 27, description: 'Velvety leaves fold gently upward as evening arrives.', image: 'photo-1501004318641-b39e6451bec6' },
      { name: 'Baby Rubber Plant', price: 23, description: 'A compact beauty with thick leaves and a glossy finish.', image: 'photo-1485955900006-10f4d324d411' },
      { name: 'Staghorn Fern', price: 39, description: 'Unusual antler-like fronds make a charming conversation piece.', image: 'photo-1487530811176-3780de880c2d' },
    ],
  },
]

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="cart-icon">
      <path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 8H6" />
      <circle cx="10" cy="20" r="1.3" />
      <circle cx="18" cy="20" r="1.3" />
    </svg>
  )
}

function ProductList({ onCart }) {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const cartNames = new Set(items.map((item) => item.name))

  return (
    <main className="shop-page">
      <nav className="shop-nav" aria-label="Main navigation">
        <a className="shop-brand" href="#top" aria-label="Paradise Nursery home">
          <span className="shop-brand-icon" aria-hidden="true">✿</span>
          <span>Paradise Nursery</span>
        </a>
        <a className="plants-link" href="#plants">Plants</a>
        <button className="nav-cart" type="button" onClick={onCart} aria-label={`Open cart, ${itemCount} items`}>
          <CartIcon />
          <span>Cart</span>
          <span className="cart-count">{itemCount}</span>
        </button>
      </nav>

      <section className="shop-intro" id="top">
        <p className="shop-kicker">Grown with care, chosen for you</p>
        <h1>Find your new <em>favorite</em> plant.</h1>
        <p>Make room for a little more life. Explore our greenhouse collection.</p>
      </section>

      <div className="catalog" id="plants">
        {plantGroups.map((group, groupIndex) => (
          <section className="plant-category" key={group.category}>
            <div className="category-heading">
              <span className="category-number">0{groupIndex + 1}</span>
              <div>
                <h2>{group.category}</h2>
                <p>{group.intro}</p>
              </div>
            </div>
            <div className="plant-grid">
              {group.plants.map((plant) => {
                const added = cartNames.has(plant.name)
                const image = `https://images.unsplash.com/${plant.image}?auto=format&fit=crop&w=800&q=80`
                return (
                  <article className="plant-card" key={plant.name}>
                    <div className="plant-image-wrap">
                      <img src={image} alt={plant.name} loading="lazy" />
                      <span className="plant-tag">Nursery favorite</span>
                    </div>
                    <div className="plant-details">
                      <div className="plant-title-row">
                        <h3>{plant.name}</h3>
                        <span className="plant-price">${plant.price}</span>
                      </div>
                      <p>{plant.description}</p>
                      <button
                        className={`add-button${added ? ' is-added' : ''}`}
                        type="button"
                        disabled={added}
                        onClick={() => dispatch(addItem({ ...plant, image }))}
                      >
                        {added ? '✓ Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        ))}
      </div>
      <footer className="shop-footer">A greener home starts here <span aria-hidden="true">✿</span></footer>
    </main>
  )
}

export default ProductList