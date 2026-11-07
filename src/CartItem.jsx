import { useDispatch, useSelector } from 'react-redux'
import { removeItem, updateQuantity } from './CartSlice.jsx'
import './CartItem.css'

function CartItem({ onContinueShopping }) {
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const changeQuantity = (item, quantity) => {
    if (quantity < 1) {
      dispatch(removeItem(item.name))
      return
    }
    dispatch(updateQuantity({ name: item.name, quantity }))
  }

  return (
    <main className="cart-page">
      <header className="cart-page-header">
        <a className="shop-brand" href="#cart" aria-label="Paradise Nursery">
          <span className="shop-brand-icon" aria-hidden="true">✿</span>
          <span>Paradise Nursery</span>
        </a>
        <button className="cart-back-link" type="button" onClick={onContinueShopping}>← Continue shopping</button>
      </header>
      <section className="cart-content" id="cart">
        <div className="cart-heading-row">
          <div>
            <p className="cart-eyebrow">Your little indoor garden</p>
            <h1>Your cart <span>({itemCount})</span></h1>
          </div>
          <div className="cart-total-top">
            <span>Total amount</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <span className="empty-cart-icon" aria-hidden="true">✿</span>
            <h2>Your cart is ready to grow</h2>
            <p>Browse the collection and find a plant that feels like home.</p>
            <button className="checkout-button" type="button" onClick={onContinueShopping}>Explore plants</button>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {items.map((item) => (
                <article className="cart-row" key={item.name}>
                  <img className="cart-item-image" src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h2>{item.name}</h2>
                    <p>${item.price.toFixed(2)} <span>each</span></p>
                  </div>
                  <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                    <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => changeQuantity(item, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => changeQuantity(item, item.quantity + 1)}>+</button>
                  </div>
                  <div className="cart-subtotal">
                    <span>Subtotal</span>
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </div>
                  <button className="delete-item" type="button" onClick={() => dispatch(removeItem(item.name))}>Delete</button>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <p>Plants make a house feel more like home.</p>
              <div className="summary-actions">
                <strong>Total <span>${total.toFixed(2)}</span></strong>
                <button className="checkout-button" type="button" onClick={() => window.alert('Coming Soon')}>Checkout</button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default CartItem