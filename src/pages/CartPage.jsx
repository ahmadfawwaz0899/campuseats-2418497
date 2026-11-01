import { useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'

export default function CartPage() {
  // Pulling everything from context now!
  const { cart, total, changeQty, changeNote, removeFromCart, placeOrder } = useCart()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return <p className="muted">Your cart is empty. Pick something from a menu first.</p>
  }

  function handlePlaceOrder(details) {
    placeOrder(details)
    navigate('/orders') // Programmatic navigation after checkout
  }

  return (
    <div className="cart-layout">
      <div className="card">
        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem 
              key={line.item.id} 
              line={line}
              onChangeQty={changeQty}
              onChangeNote={changeNote} // MATRIC NUMBER ASSIGNMENT: Passed from context
              onRemove={removeFromCart} 
            />
          ))}
        </ul>
        <p className="cart-total">Total: RM {total.toFixed(2)}</p>
      </div>
      <CheckoutForm onPlaceOrder={handlePlaceOrder} />
    </div>
  )
}