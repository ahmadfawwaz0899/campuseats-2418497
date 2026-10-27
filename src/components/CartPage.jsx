import CartItem from './CartItem.jsx'
import CheckoutForm from './CheckoutForm.jsx'

// MATRIC NUMBER ASSIGNMENT: added onChangeNote to the destructured props
function CartPage({ cart, onChangeQty, onChangeNote, onRemove, onPlaceOrder }) {
  if (cart.length === 0) {
    return <p className="muted">Your cart is empty. Pick something from a menu first.</p>
  }

  // Derive total with reduce, never store it in state
  const total = cart.reduce((sum, line) => sum + (line.item.price * line.qty), 0)

  return (
    <div className="cart-layout">
      <div className="card">
        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem 
              key={line.item.id} 
              line={line}
              onChangeQty={onChangeQty}
              onChangeNote={onChangeNote} // MATRIC NUMBER ASSIGNMENT: Forward the handler to CartItem
              onRemove={onRemove} 
            />
          ))}
        </ul>
        <p className="cart-total">Total: RM {total.toFixed(2)}</p>
      </div>
      <CheckoutForm onPlaceOrder={onPlaceOrder} />
    </div>
  )
}

export default CartPage