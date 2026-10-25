import { useState, useEffect } from 'react'
import { Loading, ErrorMessage } from './components/Status.jsx'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import CartPage from './components/CartPage.jsx'

function App() {
  // --- View and Data State ---
  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  
  // --- App State ---
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([]) // Array of { item, qty }
  const [lastOrder, setLastOrder] = useState(null)

  // --- Fetching Data (B2) ---
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        if (data.length > 0) {
          setSelectedVendorId(data[0].id) // Select first vendor automatically
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [reloadKey])

  // --- Derived Values ---
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
  
  // Header badge shows total quantity computed with reduce (B3)
  const cartCount = cart.reduce((total, line) => total + line.qty, 0)

  // --- Cart Handlers (B3) ---
  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find((line) => line.item.id === item.id)
      if (existing) {
        // Increase qty if already in cart
        return prevCart.map((line) => 
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      } else {
        // Add new line
        return [...prevCart, { item, qty: 1 }]
      }
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prev) => {
      return prev
        .map((line) => {
          if (line.item.id === itemId) {
            return { ...line, qty: line.qty + delta }
          }
          return line
        })
        .filter((line) => line.qty > 0) // A line whose qty reaches 0 disappears
    })
  }

  function handleRemove(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  function handlePlaceOrder(details) {
    // Derive total for the final view (B5)
    const total = cart.reduce((sum, line) => sum + (line.item.price * line.qty), 0)
    setLastOrder({ ...details, total })
    setCart([]) // Clear the cart
    setView('done')
  }

  // --- View Routing (B3) ---
  let content
  if (view === 'cart') {
    content = (
      <CartPage 
        cart={cart} 
        onChangeQty={handleChangeQty}
        onRemove={handleRemove} 
        onPlaceOrder={handlePlaceOrder} 
      />
    )
  } else if (view === 'done') {
    content = (
      <div className="card">
        <h2>Order placed!</h2>
        <p>Name: {lastOrder?.name}</p>
        <p>Mahallah: {lastOrder?.mahallah}</p>
        <p>Pickup time: {lastOrder?.pickupTime}</p>
        <p className="cart-total">Total: RM {lastOrder?.total.toFixed(2)}</p>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = (
      <ErrorMessage 
        message={error} 
        onRetry={() => setReloadKey((k) => k + 1)} 
      />
    )
  } else if (selectedVendor) {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="section-title">Menu: {selectedVendor.name}</h2>
          <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
        </section>
      </>
    )
  }

  return (
    <>
      <Header 
        cartCount={cartCount}
        onShowMenu={() => setView('menu')} 
        onShowCart={() => setView('cart')} 
      />
      <main className="container">
        {content}
      </main>
      <Footer />
    </>
  )
}

export default App