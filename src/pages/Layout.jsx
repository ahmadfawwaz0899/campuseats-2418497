import { Outlet } from 'react-router'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function Layout() {
  return (
    <>
      {/* Notice we removed the props from Header; it will use the context now! */}
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}