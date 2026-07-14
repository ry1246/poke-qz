import { useQuiz } from '../hooks/useQuiz'
import ChoiceButtons from '../components/ChoiceButtons'
import QuizResult from '../components/QuizResult'

function SilhouetteQuizPage() {
  const { quiz, loading, error, answered, isCorrect, loadQuiz, setSelectedId } =
    useQuiz()

  if (loading) return <p>読み込み中...</p>
  if (error) return <p>エラー : {error}</p>
  if (!quiz) return null

  return (
    <div>
      <h2>Silhouette QZ!</h2>
      <p>このシルエットのポケモンは？</p>

      <img
        src={quiz.answer.imageUrl}
        alt="シルエット"
        width={200}
        style={{
          filter: answered ? 'none' : 'brightness(0)',
          transition: 'filter 0.3s',
        }}
      />

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
        />
      )}
    </div>
  )
}

export default SilhouetteQuizPage
