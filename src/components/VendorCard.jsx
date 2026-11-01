import { Link } from 'react-router'

function VendorCard({ vendor }) {
  // Note: isSelected and onSelect props have been removed. 
  // In Lab 4, selection is handled by the URL route (/vendor/:id).
  
  return (
    <Link 
      to={`/vendor/${vendor.id}`} 
      className="card vendor-card" 
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div className="thumb" aria-hidden="true">{vendor.name.charAt(0)}</div>
      <div>
        <h3>{vendor.name}</h3>
        <p className="muted">{vendor.location}</p>
        <p className="muted">Open: {vendor.openHours}</p>
        <span className={vendor.isOpen ? 'status open' : 'status closed'}>
          {vendor.isOpen ? 'Open now' : 'Closed'}
        </span>
      </div>
    </Link>
  )
}

export default VendorCard