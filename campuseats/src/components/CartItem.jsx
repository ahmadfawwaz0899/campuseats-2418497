// One row in the cart. It shows data and reports clicks upward; it owns no state.
// MATRIC NUMBER ASSIGNMENT: added onChangeNote prop
function CartItem({ line, onChangeQty, onChangeNote, onRemove }) {
  // MATRIC NUMBER ASSIGNMENT: extract note from line
  const { item, qty, note } = line

  return (
    <li className="cart-line">
      <div>
        <p className="cart-name">{item.name}</p>
        <p className="muted">RM {item.price.toFixed(2)} each</p>
        
        {/* MATRIC NUMBER ASSIGNMENT: The new textarea for notes */}
        <textarea
          placeholder="Special instructions (e.g., no onions)..."
          value={note}
          onChange={(e) => onChangeNote(item.id, e.target.value)}
          style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem', borderRadius: '4px', border: '1px solid #c5cbd3' }}
          rows="2"
        />
      </div>
      
      <div className="qty">
        <button type="button" onClick={() => onChangeQty(item.id, -1)}>-</button>
        <span>{qty}</span>
        <button type="button" onClick={() => onChangeQty(item.id, 1)}>+</button>
      </div>
      
      <p className="line-total">RM {(item.price * qty).toFixed(2)}</p>
      
      <button 
        type="button" 
        className="link danger" 
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </li>
  )
}

export default CartItem