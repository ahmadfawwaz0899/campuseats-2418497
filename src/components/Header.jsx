import { NavLink } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function Header() {
  // Pull the total item count directly from your Cart Context!
  const { count } = useCart()

  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>
      <nav className="nav">
        {/* The 'end' prop ensures this link is only active on the exact home URL */}
        <NavLink to="/" end className="link">
          Vendors
        </NavLink>
        <NavLink to="/orders" className="link">
          My Orders
        </NavLink>
        <NavLink to="/cart" className="link cart">
          Cart <span className="badge">{count}</span>
        </NavLink>
      </nav>
    </header>
  )
}

export default Header