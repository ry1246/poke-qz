import { useQuiz } from '../hooks/useQuiz'
import type { PokemonStats } from '../types/pokemon'
import ChoiceButtons from '../components/ChoiceButtons'
import QuizResult from '../components/QuizResult';

// 表示用: statsのキーと日本語の対応
const STATS_LABELS: { key: keyof PokemonStats; label: string }[] = [
  { key: 'hp', label: 'HP' },
  { key: 'attack', label: 'こうげき' },
  { key: 'defense', label: 'ぼうぎょ' },
  { key: 'specialAttack', label: 'とくこう' },
  { key: 'specialDefense', label: 'とくぼう' },
  { key: 'speed', label: 'すばやさ' },
]

function StatsQuizPage() {
  const { quiz, loading, error, answered, isCorrect, loadQuiz, setSelectedId } =
    useQuiz()

  if (loading) return <p>読み込み中...</p>
  if (error) return <p>エラー: {error}</p>
  if (!quiz) return null

  return (
    <div>
      <h2>Stats QZ!</h2>
      <p>この種族値のポケモンは？</p>

      <ul className="stats">
        {STATS_LABELS.map(({ key, label }) => (
          <li key={key}>
            {label}: {quiz.answer.stats[key]}
          </li>
        ))}
      </ul>

      <ChoiceButtons 
        choices={quiz.choices}
        answered={answered}
        onSelect={setSelectedId}
      />

      {answered && (
        <QuizResult
          isCorrect={isCorrect}
          answerName={quiz.answer.name}
          onNext={loadQuiz}
        >
          <img src={quiz.answer.imageUrl} alt={quiz.answer.name} width={160} />
        </QuizResult>
      )}
    </div>
  )
}

export default StatsQuizPage
