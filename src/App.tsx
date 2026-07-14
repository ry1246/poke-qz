import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import StatsQuizPage from './pages/StatsQuizPage'
import SilhouetteQuizPage from './pages/SilhouetteQuizPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="quiz/stats" element={<StatsQuizPage />} />
        <Route path="quiz/silhouette" element={<SilhouetteQuizPage />} />
      </Route>
    </Routes>
  )
}

export default App
