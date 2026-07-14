import { NavLink, Outlet } from 'react-router'

// アクティブリンクを太字へ
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav-link nav-link--active' : 'nav-link'

function Layout() {
  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/quiz/stats" className={navLinkClass}>
            Stats QZ
          </NavLink>
          <NavLink to="/quiz/silhouette" className={navLinkClass}>
            Silhouette QZ
          </NavLink>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
