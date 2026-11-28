import { Outlet, useLocation } from 'react-router-dom'
import BackToTop from '../ui/BackToTop'
import Footer from './Footer'
import Navbar from './Navbar'

export default function AppLayout() {
  const location = useLocation()

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <div className="page-transition" key={location.pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
