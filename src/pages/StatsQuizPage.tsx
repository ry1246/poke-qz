import { useEffect, useState } from 'react'
import { fetchStatsQuiz } from '../api/pokeapi'
import type { StatsQuiz } from '../api/pokeapi'
import type { PokemonStats } from '../types/pokemon'

// 表示用: statsのキーと日本語の対応
const STATS_LABELS: { key: keyof PokemonStats; label: string }[] =  [
  { key: 'hp', label: 'HP' },
  { key: 'attack', label: 'こうげき' },
  { key: 'defense', label: 'ぼうぎょ' },
  { key: 'specialAttack', label: 'とくこう' },
  { key: 'specialDefense', label: 'とくぼう' },
  { key: 'speed', label: 'すばやさ' },
]

function StatsQuizPage() {
  const [quiz, setQuiz] = useState<StatsQuiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // 1問読み込む
  async function loadQuiz() {
    setLoading(true)
    setError(null)
    setSelectedId(null)
    try {
      const next = await fetchStatsQuiz()
      setQuiz(next)
    } catch (e) {
      setError(e instanceof Error ? e.message : '取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  // マウント時に1度だけ実行
  useEffect(() => {
    loadQuiz()
  }, [])

  if (loading) return <p>読み込み中...</p>
  if (error) return <p>エラー: {error}</p>
  if (!quiz) return null

  const answered = selectedId !== null
  const isCorrect = selectedId === quiz.answer.id

  return (
    <div>
      <h2>Stats QZ!</h2>
      <p>この種族値のポケモンは？</p>

      {/* 種族値の表示 */}
      <ul>
        {STATS_LABELS.map(({ key, label }) => (
          <li key={key}>
          {label}: {quiz.answer.stats[key]}
          </li>
        ))}
      </ul>

      {/* 4択ボタン */}
      <div>
      {quiz.choices.map((p) => (
        <button key={p.id} onClick={() => setSelectedId(p.id)} disabled={answered} >
          {p.name}
        </button>
      ))}
      </div>

      {/* 回答後の結果 */}
      {answered && (
        <div>
          <p>{isCorrect ? '正解!' : `不正解... 正解は ${quiz.answer.name}`}</p>
          <img src={quiz.answer.imageUrl} alt={quiz.answer.name} width={160} />
          <div>
            <button onClick={loadQuiz}>次の問題へ</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default StatsQuizPage
