import { useCart } from '../hooks/useCart.js'

export default function OrdersPage() {
  const { orders } = useCart()

  if (!orders || orders.length === 0) {
    return <p className="muted">You haven't placed any orders yet.</p>
  }

  return (
    <section>
      <h2 className="section-title">Your Orders</h2>
      <div>
        {orders.map((order, index) => (
          <div key={index} className="card" style={{ marginBottom: '1.5rem' }}>
            <h3>Order #{index + 1}</h3>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Mahallah:</strong> {order.mahallah}</p>
            <p><strong>Pickup time:</strong> {order.pickupTime}</p>
            
            {/* MATRIC NUMBER ASSIGNMENT: Displaying notes on the Orders page */}
            <div style={{ margin: '1rem 0', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
              <h4>Order Details:</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {order.items.map((line) => (
                  <li key={line.item.id} style={{ marginBottom: '0.5rem' }}>
                    {line.qty}x {line.item.name}
                    {line.note && <div className="muted" style={{ fontSize: '0.85rem' }}>Note: {line.note}</div>}
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="cart-total">Total: RM {order.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}