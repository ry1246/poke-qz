import { useQuiz } from '../hooks/useQuiz'

function SilhouetteQuizPage() {

  const { quiz, loading, error, answered, isCorrect, loadQuiz, setSelectedId } = useQuiz()

  if (loading) return <p>読み込み中...</p>
  if (error) return <p>エラー : {error}</p>
  if (!quiz) return null

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
