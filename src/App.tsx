import { Routes, Route, NavLink, Outlet } from 'react-router'
import HomePage from './pages/HomePage'
import StatsQuizPage from './pages/StatsQuizPage'
import SilhouetteQuizPage from './pages/SilhouetteQuizPage'

// アクティブリンクを太字にする
const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  fontWeight: isActive ? 'bold' : 'normal',
})

// ナビゲーション共通レイアウト
function Layout() {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/" style={navLinkStyle}>Home</NavLink>
          {' | '}
          <NavLink to="/quiz/stats" style={navLinkStyle}>Stats Qz</NavLink>
          {' | '}
          <NavLink to="/quiz/silhouette" style={navLinkStyle}>Silhouette Qz</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="quiz/stats" element={<StatsQuizPage />} />
        <Route path="quiz/silhouette" element={<SilhouetteQuizPage />}/>
      </Route>
    </Routes>
  )
}

export default App
