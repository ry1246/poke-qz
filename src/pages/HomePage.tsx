import { Link } from 'react-router'

function HomePage() {
  return (
    <div>
      <h1>Poke QZ</h1>
      <p>Let's pick a quiz</p>
      <ul>
        <li><Link to="/quiz/stats">Stats</Link></li>
        <li><Link to="/quiz/silhouette">Silhoutte</Link></li>
      </ul>
    </div>
  )
}

export default HomePage
