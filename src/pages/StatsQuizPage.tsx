import { useQuiz } from '../hooks/useQuiz'
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
  const { quiz, loading, error, answered, isCorrect, loadQuiz, setSelectedId } = useQuiz()

  if (loading) return <p>読み込み中...</p>
  if (error) return <p>エラー: {error}</p>
  if (!quiz) return null

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
