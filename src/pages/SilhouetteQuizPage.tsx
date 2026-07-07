import { useEffect, useState } from 'react'
import { fetchStatsQuiz } from '../api/pokeapi'
import type { StatsQuiz } from '../api/pokeapi'

function SilhouetteQuizPage() {
  const [quiz, setQuiz] = useState<StatsQuiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // 1 問読み込む
  async function loadQuiz() {
    setLoading(true)
    setError(null)
    setSelectedId(null)
    try {
      const next = await fetchStatsQuiz();
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
  if (error) return <p>エラー : {error}</p>
  if (!quiz) return null

  const answered = selectedId !== null
  const isCorrect = selectedId === quiz.answer.id

  return (
    <div>
      <h2>Silhouette QZ!</h2>
      <p>このシルエットのポケモンは？</p>

      { /* シルエット画像 */ }
      <img src={quiz.answer.imageUrl} alt="シルエット" width={200} 
        style={{ 
          filter: answered ? 'none' : 'brightness(0)', 
          transition: 'filter 0.3s',
        }}
      />

      { /* 4択ボタン */ }
      <div>
        {quiz.choices.map((p) => (
          <button key={p.id} onClick={() => setSelectedId(p.id)} disabled={answered}>
            {p.name}
          </button>
        ))}
      </div>

      {/* 結果 */}
      {answered && (
        <div>
          <p>{isCorrect ? '正解' : `不正解...正解は ${quiz.answer.name}`}</p>
          <div>
            <button onClick={loadQuiz}>次の問題へ</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SilhouetteQuizPage
